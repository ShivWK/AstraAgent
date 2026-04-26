import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import OrdersModel from '@/model/ordersModel';
import { connectDB } from '@/lib/db/connectDb';

const PLAN_MAP: Record<number, number> = {
  99: 1000,
  199: 2500,
  499: 7000,
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { amount } = await request.json();

    if (!amount || amount < 10) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum is ₹10.' },
        { status: 400 },
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_TEST_API_KEY!,
      key_secret: process.env.RAZORPAY_TEST_API_SECRET!,
    });

    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    let tokensToAdd = PLAN_MAP[amount];

    if (!tokensToAdd) {
      tokensToAdd = amount * 10;
    }

    await connectDB();
    const orderDetails = await OrdersModel.create({
      userId: session.user?.id,
      orderId: order.id,
      paymentId: null,
      amount: amount,
      tokensAdded: tokensToAdd,
      status: 'pending',
    });

    return NextResponse.json({
      razorpayOrderId: order.id,
      orderDetailsId: orderDetails._id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 },
    );
  }
}
