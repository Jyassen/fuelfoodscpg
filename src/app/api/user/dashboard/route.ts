import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            error: 'unauthorized',
            message: 'Authentication required',
          },
        },
        { status: 401 }
      );
    }

    // Get user with related data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            error: 'user_not_found',
            message: 'User not found',
          },
        },
        { status: 404 }
      );
    }

    // Get active subscriptions with next delivery date
    const subscriptions = await prisma.userSubscription.findMany({
      where: {
        userId: session.user.id,
        status: {
          in: ['active', 'trialing'],
        },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        planType: true,
        status: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
        createdAt: true,
      },
    });

    // Get recent orders
    const recentOrders = await prisma.order.findMany({\n      where: { userId: session.user.id },\n      orderBy: { createdAt: 'desc' },\n      take: 3,\n      select: {\n        id: true,\n        orderNumber: true,\n        status: true,\n        total: true,\n        createdAt: true,\n        items: {\n          select: {\n            productName: true,\n            quantity: true,\n          },\n        },\n      },\n    });\n\n    // Get statistics\n    const stats = await prisma.$transaction([\n      prisma.order.count({\n        where: { userId: session.user.id },\n      }),\n      prisma.userSubscription.count({\n        where: {\n          userId: session.user.id,\n          status: {\n            in: ['active', 'trialing'],\n          },\n        },\n      }),\n      prisma.order.aggregate({\n        where: {\n          userId: session.user.id,\n          status: 'DELIVERED',\n        },\n        _sum: {\n          total: true,\n        },\n      }),\n    ]);\n\n    const [totalOrders, activeSubscriptions, totalSpentResult] = stats;\n    const totalSpent = totalSpentResult._sum.total || 0;\n\n    // Calculate estimated savings (10% discount assumption for subscriptions)\n    const estimatedSavings = Number(totalSpent) * 0.1;\n\n    // Find next delivery date from active subscriptions\n    const nextDeliveryDate = subscriptions.length > 0\n      ? subscriptions.reduce((earliest, sub) => {\n          const deliveryDate = sub.currentPeriodEnd;\n          return !earliest || (deliveryDate && deliveryDate < earliest)\n            ? deliveryDate\n            : earliest;\n        }, null as Date | null)\n      : null;\n\n    const dashboardData = {\n      user: {\n        firstName: user.firstName || '',\n        lastName: user.lastName || '',\n        nextDeliveryDate,\n      },\n      stats: {\n        totalOrders,\n        activeSubscriptions,\n        totalSaved: Math.round(estimatedSavings),\n      },\n      subscriptions: subscriptions.map(sub => ({\n        id: sub.id,\n        planType: sub.planType.toLowerCase(),\n        status: sub.status,\n        nextDeliveryDate: sub.currentPeriodEnd,\n        cancelAtPeriodEnd: sub.cancelAtPeriodEnd,\n        // Mock pricing - replace with actual pricing logic\n        recurringAmount: sub.planType === 'PRO' ? 45 : sub.planType === 'ELITE' ? 75 : 15,\n      })),\n      recentOrders: recentOrders.map(order => ({\n        id: order.id,\n        orderNumber: order.orderNumber,\n        status: order.status.toLowerCase(),\n        total: Number(order.total),\n        createdAt: order.createdAt,\n        itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),\n        itemNames: order.items.map(item => item.productName).join(', '),\n      })),\n    };\n\n    return NextResponse.json({\n      success: true,\n      data: dashboardData,\n    });\n  } catch (error) {\n    console.error('Dashboard data error:', error);\n    return NextResponse.json(\n      {\n        success: false,\n        error: {\n          error: 'internal_server_error',\n          message: 'An error occurred while fetching dashboard data',\n        },\n      },\n      { status: 500 }\n    );\n  }\n}