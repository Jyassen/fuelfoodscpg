import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { JWTService } from '@/lib/auth/jwt';
import { db } from '@/lib/db/connection';

const addressSchema = z.object({
  type: z.enum(['shipping', 'billing']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  country: z.string().default('US'),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
});

async function getUserFromToken(authHeader: string | null) {
  const token = JWTService.extractTokenFromHeader(authHeader);
  if (!token) {
    throw new Error('No token provided');
  }

  const payload = JWTService.verifyToken(token);
  if (!payload) {
    throw new Error('Invalid token');
  }

  const user = await db.findUserById(payload.userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

// GET /api/user/addresses - Get user's addresses
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request.headers.get('authorization'));
    const addresses = await db.findAddressesByUserId(user.id);

    return NextResponse.json({
      success: true,
      addresses: addresses,
    });

  } catch (error: any) {
    console.error('Get addresses error:', error);
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/user/addresses - Create new address
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request.headers.get('authorization'));
    
    const body = await request.json();
    const validatedData = addressSchema.parse(body);

    // If this is the first address or marked as default, make it default
    const existingAddresses = await db.findAddressesByUserId(user.id);
    const shouldBeDefault = validatedData.isDefault || existingAddresses.length === 0;

    // If making this the default, unset other defaults of the same type
    if (shouldBeDefault) {
      const addressesToUpdate = existingAddresses.filter(
        addr => addr.type === validatedData.type && addr.is_default
      );
      
      for (const addr of addressesToUpdate) {
        await db.updateAddress(addr.id, { is_default: false });
      }
    }

    // Create the new address
    const newAddress = await db.createAddress({
      user_id: user.id,
      type: validatedData.type,
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      company: validatedData.company || null,
      address1: validatedData.address1,
      address2: validatedData.address2 || null,
      city: validatedData.city,
      state: validatedData.state,
      postal_code: validatedData.postalCode,
      country: validatedData.country,
      phone: validatedData.phone || null,
      is_default: shouldBeDefault,
    });

    return NextResponse.json({
      success: true,
      address: newAddress,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create address error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}