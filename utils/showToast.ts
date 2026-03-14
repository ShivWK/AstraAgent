import { type TriggerToastArgumentsType } from '@/hooks/useToast';

type ArgumentsType = {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  animation?: 'slide' | 'pop';
  trigger: (val: TriggerToastArgumentsType) => void;
};

export function showToast({
  message,
  type,
  animation = 'slide',
  trigger,
}: ArgumentsType) {
  const toast: TriggerToastArgumentsType = {
    message,
    animation,
    type,
    duration: 3000,
  };

  trigger(toast);
}
