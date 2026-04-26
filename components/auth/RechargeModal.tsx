import { useState } from 'react';
import Modal from '../common/Modal';
import { X } from 'lucide-react';

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
  onProceed: (amount: number, planId?: string) => void;
};

const RechargeModal = ({ isOpen, setIsOpen, onProceed }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [customAmount, setCustomAmount] = useState('');

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

  const handleProceed = () => {
    const amount = selectedPlan?.price || Number(customAmount);

    if (!amount || amount < 10) {
      alert('Minimum recharge is ₹10');
      return;
    }

    onProceed(amount, selectedPlan?.id);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      showClasses="opacity-100 scale-100"
      hideClasses="opacity-0 scale-0"
      className="fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-blue-900 text-center shadow-lg md:w-[35%]"
    >
      <div className="flex flex-col gap-6 p-4 pt-8 text-white">
        <button
          aria-label="Close recharge modal"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 rounded-full p-0.5 text-gray-400 transition-all duration-150 ease-linear hover:bg-gray-600 hover:text-white"
        >
          <X />
        </button>

        <div>
          <h2 className="text-xl font-semibold">Recharge Tokens</h2>
          <p className="text-sm text-gray-300">
            Choose a plan or enter custom amount
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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

                <p className="text-sm text-gray-300">{plan.label}</p>
                <p className="mt-1 text-2xl font-bold">₹{plan.price}</p>
                <p className="text-sm text-gray-200">{plan.tokens} tokens</p>
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
            value={customAmount}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder="₹ Enter amount"
            className="rounded-lg border border-gray-700 bg-black px-3 py-2 outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-300">₹1 = 10 tokens</p>
        </div>

        <div className="rounded-lg bg-white/5 p-3 text-sm">
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

        {/* 🔹 CTA */}
        <button
          onClick={handleProceed}
          disabled={!selectedPlan && !customAmount}
          className="rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Proceed to Pay
        </button>
      </div>
    </Modal>
  );
};

export default RechargeModal;
