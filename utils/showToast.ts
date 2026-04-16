import { type TriggerToastArgumentsType } from '@/hooks/useToast';

type ArgumentsType = {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  animation?: 'slide' | 'pop';
  trigger: (val: TriggerToastArgumentsType) => void;
  duration?: number;
};

export function showToast({
  message,
  type,
  animation = 'slide',
  trigger,
  duration = 3000,
}: ArgumentsType) {
  const toast: TriggerToastArgumentsType = {
    message,
    animation,
    type,
    duration,
  };

  trigger(toast);
}
