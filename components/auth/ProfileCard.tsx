import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import RechargeModal from './RechargeModal';
import useToast from '@/hooks/useToast';
import { showToast } from '@/utils/showToast';
import { useSession } from 'next-auth/react';
import {
  type RazorpayResponse,
  type RazorpayFailedResponse,
} from '@/types/razorpayTypes';

type PropsType = {
  user:
    | ({
        id: string;
        role: 'user' | 'admin';
        token: number;
        totalTokens?: number | undefined;
        emailVerified: Date | null;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
  logoutLoading?: boolean;
};

export default function ProfileCard({ user, logoutLoading }: PropsType) {
  const { ToastContainer, triggerToast } = useToast('bottom-mid');
  const { data, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleRechargeClick = () => {
    if (logoutLoading) return;
    setIsOpen(true);
  };

  const handleProceed = async (
    amount: number,
    setVerifyPayment: (value: boolean) => void,
    setProcessing: (value: boolean) => void,
  ) => {
    setProcessing(true);
    const order = await fetch('/api/payments/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const orderData = await order.json();

    if (!order.ok) {
      showToast({
        message: orderData.error || 'Failed to create order. Please try again.',
        type: 'error',
        trigger: triggerToast,
      });
      setProcessing(false);
      return;
    }

    const { razorpayOrderId, orderDetailsId } = orderData;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_API_KEY!,
      amount: amount * 100,
      currency: 'INR',

      name: 'Astra Agent',
      description: 'Recharge Tokens',
      image:
        'https://res.cloudinary.com/dis1iphl0/image/upload/v1773068574/My%20Brand/logo-transparent_ouww4n.png',

      order_id: razorpayOrderId,

      prefill: {
        name: data?.user?.name || '',
        email: data?.user?.email || '',
        // contact: '9999999999',
      },

      notes: {
        userId: data?.user?.id || '',
        email: data?.user?.email || '',
        orderDetailsId,
      },

      theme: {
        color: '#1c398e',
      },

      redirect: false,

      handler: async (response: RazorpayResponse) => {
        console.log('Payment Response:', response.razorpay_order_id);
        setVerifyPayment(true);
        const verifyRes = await fetch('/api/payments/verify_order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            orderDetailsId,
          }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok) {
          setVerifyPayment(false);
          setProcessing(false);
          showToast({
            message:
              verifyData.error ||
              'Payment verification failed. Please contact support.',
            type: 'error',
            trigger: triggerToast,
          });
          return;
        }

        setVerifyPayment(false);
        setProcessing(false);
        setIsOpen(false);
        showToast({
          message: `Payment successful! ${verifyData.tokensAdded} tokens added.`,
          type: 'success',
          trigger: triggerToast,
        });
        await update();
      },

      modal: {
        ondismiss: () => {
          setVerifyPayment(false);
          setProcessing(false);
        },

        escape: false,
        backdropclose: false,
        confirmclose: true,
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response: RazorpayFailedResponse) {
      setVerifyPayment(false);
      setProcessing(false);
      showToast({
        message:
          response?.error?.description || 'Payment failed. Please try again.',
        type: 'error',
        trigger: triggerToast,
      });
    });

    rzp1.open();
  };

  if (!user)
    return (
      <div className="mt-2 h-24 w-full animate-pulse rounded-2xl bg-gray-900"></div>
    );

  return user!.role === 'admin' ? (
    <div className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-gray-900 px-6 py-4">
      <div className="rounded-full bg-linear-to-r from-yellow-400 to-orange-500 p-3 shadow-[0_0_20px_rgba(255,165,0,0.4)]">
        <ShieldCheck className="h-7 w-7 text-white" />
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-white">Admin</h2>
        <p className="text-sm text-gray-400">Full Access Control</p>
      </div>
    </div>
  ) : (
    <>
      <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-2xl bg-gray-900 px-6 py-2 pb-3.5">
        <p className="text-lg font-medium">Current Balance</p>
        <p className="-mt-2 text-xl font-medium">{user!.token || 0}</p>
        <button
          onClick={handleRechargeClick}
          disabled={logoutLoading}
          className="w-full rounded-md bg-blue-700 py-1 text-lg tracking-wider transition-all duration-150 ease-linear active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0"
        >
          Recharge
        </button>
      </div>
      <RechargeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onProceed={handleProceed}
        triggerToast={triggerToast}
      />
      {ToastContainer}
    </>
  );
}
