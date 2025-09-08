import { NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@/lib/auth/jwt';
import { db } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
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

    // Get user addresses
    const addresses = await db.findAddressesByUserId(user.id);

    // In production, integrate with Stripe to get real subscription data
    let subscriptions = [];
    let totalOrders = 0;
    let totalSpent = 0;

    if (user.stripe_customer_id) {
      try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        // Get subscriptions
        const stripeSubscriptions = await stripe.subscriptions.list({
          customer: user.stripe_customer_id,
          status: 'all',
        });

        subscriptions = stripeSubscriptions.data.map((sub: any) => ({
          id: sub.id,
          stripeSubscriptionId: sub.id,
          status: sub.status,
          plan: {
            id: sub.items.data[0].price.id,
            name: sub.items.data[0].price.nickname || 'Subscription',
            price: sub.items.data[0].price.unit_amount / 100,
            frequency: sub.items.data[0].price.recurring.interval,
          },
          nextDelivery: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
          createdAt: new Date(sub.created * 1000),
        }));

        // Get payment history for order count and total spent
        const payments = await stripe.paymentIntents.list({
          customer: user.stripe_customer_id,
          limit: 100,
        });

        totalOrders = payments.data.filter((p: any) => p.status === 'succeeded').length;
        totalSpent = payments.data
          .filter((p: any) => p.status === 'succeeded')
          .reduce((sum: number, p: any) => sum + (p.amount / 100), 0);

      } catch (stripeError) {
        console.error('Failed to fetch Stripe data:', stripeError);
        // Continue without Stripe data if there's an error
      }
    }

    // Return user data without password
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      emailVerified: user.email_verified,
      stripeCustomerId: user.stripe_customer_id,
      addresses: addresses,
      subscriptions: subscriptions,
      totalOrders: totalOrders,
      totalSpent: totalSpent,
    };

    return NextResponse.json({
      success: true,
      user: userData,
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}