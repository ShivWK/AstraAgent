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
    const numbersOnly = val.replace(/\D+/g, '');
    setCustomAmount(numbersOnly);
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
      className="bg-modal-background border-modal-border fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl border text-center shadow-lg md:w-[32%]"
    >
      <>
        <div className="flex flex-col gap-5 p-4 pt-8 text-white">
          <button
            aria-label="Close recharge modal"
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-600 transition-all duration-150 ease-linear hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <X size={21} />
          </button>

          <div className="text-black dark:text-white">
            <h2 className="text-xl font-semibold">Recharge Tokens</h2>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              Choose a plan or enter custom amount
            </p>
          </div>

          <div className="mt-0.5 flex flex-col justify-evenly max-md:gap-3 md:mt-5 md:flex-row">
            {PLANS.map((plan) => {
              const isActive = selectedPlan?.id === plan.id;

              return (
                <button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`relative rounded-xl border p-4 text-left transition ${
                    isActive
                      ? 'border-blue-600 bg-blue-600/10 dark:border-blue-500 dark:bg-blue-500/10'
                      : 'border-gray-600 hover:border-black dark:border-gray-500 dark:hover:border-gray-400'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-2 py-0.5 text-xs">
                      Popular
                    </span>
                  )}

                  <p className="hidden text-center text-xl font-semibold text-gray-900 md:block md:text-sm dark:text-gray-200">
                    {plan.label}
                  </p>
                  <div className="flex items-center gap-5 md:flex-col md:gap-2">
                    <p className="mt-1 text-4xl font-bold text-black md:text-2xl dark:text-white">
                      ₹{plan.price}
                    </p>

                    <div className="flex flex-col items-start gap-0.5 text-xl text-gray-800 md:items-center md:text-sm dark:text-gray-200">
                      <p className="font-semibold md:hidden">{plan.label}</p>
                      <p>{plan.tokens} tokens</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-0.5 flex items-center gap-3 md:mt-3 md:mb-2">
            <div className="h-px flex-1 bg-gray-900 dark:bg-gray-400" />
            <span className="text-xs text-black dark:text-gray-300">OR</span>
            <div className="h-px flex-1 bg-gray-900 dark:bg-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="custom_amount"
              className="text-sm text-gray-950 dark:text-gray-300"
            >
              Enter custom amount
            </label>
            <input
              id="custom_amount"
              type="text"
              inputMode="numeric"
              max={10}
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="₹ Enter amount"
              className="rounded-lg border border-gray-700 bg-gray-300 px-3 py-2 text-black outline-none placeholder:text-gray-600 focus:border-blue-500 dark:bg-black dark:text-white dark:placeholder:text-gray-500"
            />
            <p className="text-xs text-black dark:text-gray-300">
              ₹1 = 10 tokens
            </p>
          </div>

          <div className="text-sm text-gray-900 md:mt-3 dark:text-white">
            {tokens > 0 ? (
              <p>
                You will get{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {tokens}
                </span>{' '}
                tokens
              </p>
            ) : (
              <p className="text-gray-900 dark:text-gray-300">
                Select a plan or enter amount
              </p>
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
