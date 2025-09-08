import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { JWTService } from '@/lib/auth/jwt';
import { db } from '@/lib/db/connection';

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
}).refine(data => {
  // If newPassword is provided, currentPassword must also be provided
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: 'Current password is required when setting a new password',
  path: ['currentPassword'],
});

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = JWTService.extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = JWTService.verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.findUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    const updates: any = {};

    // Update basic profile fields
    if (validatedData.firstName) {
      updates.first_name = validatedData.firstName;
    }
    if (validatedData.lastName) {
      updates.last_name = validatedData.lastName;
    }
    if (validatedData.phone !== undefined) {
      updates.phone = validatedData.phone || null;
    }

    // Handle password change
    if (validatedData.newPassword && validatedData.currentPassword) {
      // Verify current password
      const isValidPassword = await JWTService.comparePasswords(
        validatedData.currentPassword,
        user.password_hash
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      // Hash new password
      updates.password_hash = await JWTService.hashPassword(validatedData.newPassword);
    }

    // Update user in database
    const updatedUser = await db.updateUser(user.id, updates);
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    // Update Stripe customer if name changed
    if ((validatedData.firstName || validatedData.lastName) && updatedUser.stripe_customer_id) {
      try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        await stripe.customers.update(updatedUser.stripe_customer_id, {
          name: `${updatedUser.first_name} ${updatedUser.last_name}`,
        });
      } catch (stripeError) {
        console.error('Failed to update Stripe customer:', stripeError);
        // Don't fail the request if Stripe update fails
      }
    }

    // Get user addresses
    const addresses = await db.findAddressesByUserId(updatedUser.id);

    // Return updated user data without password
    const userData = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.first_name,
      lastName: updatedUser.last_name,
      phone: updatedUser.phone,
      emailVerified: updatedUser.email_verified,
      stripeCustomerId: updatedUser.stripe_customer_id,
      addresses: addresses,
      subscriptions: [], // Will be populated from Stripe data
      totalOrders: 0, // Will be calculated from order history
      totalSpent: 0, // Will be calculated from order history
    };

    return NextResponse.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}