import { useState } from 'react';
import Modal from '../common/Modal';
import { X } from 'lucide-react';
import { TriggerToastArgumentsType } from '@/hooks/useToast';
import { showToast } from '@/utils/showToast';

type Plan = {
  id: string;
  price: number;
  tokens: number;
  label: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  { id: 'basic', price: 99, tokens: 1000, label: 'Starter' },
  {
    id: 'pro',
    price: 199,
    tokens: 2500,
    label: 'Most Popular',
    highlight: true,
  },
  { id: 'premium', price: 499, tokens: 7000, label: 'Best Value' },
];

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onProceed: (
    amount: number,
    setVerifyPayment: (value: boolean) => void,
    setProcessing: (value: boolean) => void,
  ) => Promise<void>;
  triggerToast: ({
    message,
    type,
    duration,
    animation,
  }: TriggerToastArgumentsType) => void;
};

const RechargeModal = ({
  isOpen,
  setIsOpen,
  onProceed,
  triggerToast,
}: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [verifyPayment, setVerifyPayment] = useState(false);
  const [processing, setProcessing] = useState(false);

  const tokens =
    selectedPlan?.tokens || (customAmount ? Number(customAmount) * 10 : 0);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setSelectedPlan(null);
  };

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProceed = async () => {
    const amount = selectedPlan?.price || Number(customAmount);

    if (!amount || amount < 10) {
      showToast({
        message: 'Minimum recharge is ₹10',
        type: 'warning',
        trigger: triggerToast,
      });
      return;
    }

    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );
    if (!res) {
      showToast({
        message: 'Failed to load payment gateway. Please try again.',
        type: 'error',
        trigger: triggerToast,
      });
      return;
    }

    // setIsOpen(false);

    await onProceed(amount, setVerifyPayment, setProcessing);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      showClasses="opacity-100 scale-100"
      hideClasses="opacity-0 scale-0"
      className="fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-blue-900 text-center shadow-lg md:w-[32%]"
    >
      <>
        <div className="flex flex-col gap-5 p-4 pt-8 text-white">
          <button
            aria-label="Close recharge modal"
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 rounded-full bg-gray-700 p-0.5 text-gray-400 transition-all duration-150 ease-linear hover:bg-gray-600 hover:text-white"
          >
            <X size={21} />
          </button>

          <div>
            <h2 className="text-xl font-semibold">Recharge Tokens</h2>
            <p className="text-sm text-gray-300">
              Choose a plan or enter custom amount
            </p>
          </div>

          <div className="flex flex-col justify-evenly max-md:gap-3 md:flex-row">
            {PLANS.map((plan) => {
              const isActive = selectedPlan?.id === plan.id;

              return (
                <button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`relative rounded-xl border p-4 text-left transition ${
                    isActive
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-500 hover:border-gray-400'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-2 py-0.5 text-xs">
                      Popular
                    </span>
                  )}

                  <p className="hidden text-center text-xl font-semibold text-gray-200 md:block md:text-sm">
                    {plan.label}
                  </p>
                  <div className="flex items-center gap-5 md:flex-col md:gap-2">
                    <p className="mt-1 text-4xl font-bold md:text-2xl">
                      ₹{plan.price}
                    </p>

                    <div className="flex flex-col items-start gap-0.5 md:items-center">
                      <p className="text-xl font-semibold text-gray-200 md:hidden md:text-sm">
                        {plan.label}
                      </p>
                      <p className="text-gray-200 md:text-sm">
                        {plan.tokens} tokens
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-400" />
            <span className="text-xs text-gray-300">OR</span>
            <div className="h-px flex-1 bg-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Enter custom amount</label>
            <input
              type="number"
              max={10}
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="₹ Enter amount"
              className="rounded-lg border border-gray-700 bg-black px-3 py-2 outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-300">₹1 = 10 tokens</p>
          </div>

          <div className="-mt-4 text-sm">
            {tokens > 0 ? (
              <p>
                You will get{' '}
                <span className="font-semibold text-blue-400">{tokens}</span>{' '}
                tokens
              </p>
            ) : (
              <p className="text-gray-300">Select a plan or enter amount</p>
            )}
          </div>

          <button
            onClick={handleProceed}
            disabled={(!selectedPlan && !customAmount) || verifyPayment}
            className="flex items-center justify-center rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            {processing
              ? verifyPayment
                ? 'Verifying Payment...'
                : 'Processing...'
              : 'Proceed to Pay'}

            {(processing || verifyPayment) && (
              <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></span>
            )}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default RechargeModal;

// 4100 2800 0000 1007
