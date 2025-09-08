import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { JWTService } from '@/lib/auth/jwt';
import { db } from '@/lib/db/connection';

const updateAddressSchema = z.object({
  type: z.enum(['shipping', 'billing']).optional(),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  company: z.string().optional(),
  address1: z.string().min(1, 'Address is required').optional(),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().min(2, 'State is required').optional(),
  postalCode: z.string().min(5, 'Postal code is required').optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  isDefault: z.boolean().optional(),
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

// PATCH /api/user/addresses/[id] - Update address
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request.headers.get('authorization'));
    const addressId = params.id;

    // Get the existing address and verify ownership
    const userAddresses = await db.findAddressesByUserId(user.id);
    const existingAddress = userAddresses.find(addr => addr.id === addressId);
    
    if (!existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateAddressSchema.parse(body);

    const updates: any = {};

    // Map validated data to database fields
    if (validatedData.type) updates.type = validatedData.type;
    if (validatedData.firstName) updates.first_name = validatedData.firstName;
    if (validatedData.lastName) updates.last_name = validatedData.lastName;
    if (validatedData.company !== undefined) updates.company = validatedData.company || null;
    if (validatedData.address1) updates.address1 = validatedData.address1;
    if (validatedData.address2 !== undefined) updates.address2 = validatedData.address2 || null;
    if (validatedData.city) updates.city = validatedData.city;
    if (validatedData.state) updates.state = validatedData.state;
    if (validatedData.postalCode) updates.postal_code = validatedData.postalCode;
    if (validatedData.country) updates.country = validatedData.country;
    if (validatedData.phone !== undefined) updates.phone = validatedData.phone || null;
    if (validatedData.isDefault !== undefined) updates.is_default = validatedData.isDefault;

    // If setting as default, unset other defaults of the same type
    if (validatedData.isDefault) {
      const addressType = validatedData.type || existingAddress.type;
      const addressesToUpdate = userAddresses.filter(
        addr => addr.type === addressType && addr.is_default && addr.id !== addressId
      );
      
      for (const addr of addressesToUpdate) {
        await db.updateAddress(addr.id, { is_default: false });
      }
    }

    // Update the address
    const updatedAddress = await db.updateAddress(addressId, updates);
    if (!updatedAddress) {
      return NextResponse.json(
        { error: 'Failed to update address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      address: updatedAddress,
    });

  } catch (error: any) {
    console.error('Update address error:', error);
    
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

// DELETE /api/user/addresses/[id] - Delete address
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request.headers.get('authorization'));
    const addressId = params.id;

    // Get the existing address and verify ownership
    const userAddresses = await db.findAddressesByUserId(user.id);
    const existingAddress = userAddresses.find(addr => addr.id === addressId);
    
    if (!existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    // Delete the address
    const deleted = await db.deleteAddress(addressId);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Address deleted successfully',
    });

  } catch (error: any) {
    console.error('Delete address error:', error);
    
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