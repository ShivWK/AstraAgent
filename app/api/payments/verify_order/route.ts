import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { UserModel } from '@/model/userModel';
import OrdersModel from '@/model/ordersModel';
import { connectDB } from '@/lib/db/connectDb';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    await connectDB();
    const user = await UserModel.findById(session?.user.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { orderId, paymentId, signature, orderDetailsId } =
      await request.json();

    console.log('Received payment details:', {
      orderId,
      paymentId,
      signature,
      orderDetailsId,
    });

    const secret = process.env.RAZORPAY_TEST_API_SECRET!;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 },
      );
    }

    const orderDetails = await OrdersModel.findById(orderDetailsId);

    if (!orderDetails) {
      return NextResponse.json(
        { success: false, message: 'Order details not found' },
        { status: 404 },
      );
    }

    if (orderDetails.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 },
      );
    }

    if (orderDetails.orderId !== orderId) {
      return NextResponse.json(
        { success: false, message: 'Order mismatch' },
        { status: 400 },
      );
    }

    if (orderDetails.status === 'success') {
      return NextResponse.json({ success: true });
    }

    if (user) {
      user.token += orderDetails.tokensAdded;
      user.totalTokens = user.token;
      await user.save();
    }

    orderDetails.paymentId = paymentId;
    orderDetails.status = 'success';
    await orderDetails.save();

    return NextResponse.json({
      success: true,
      tokensAdded: orderDetails.tokensAdded,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify payment' },
      { status: 500 },
    );
  }
}
