import Modal from '../common/Modal';
import { useState, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Conversation } from '@/types/conversation';
import { type Agent } from '@/types/agents';
import { Button } from '../ui/button';

type Props = {
  isOpen: boolean;
  initialValue: string;
  onClose: () => void;
  conversationId: string;
  setRenameLoading: Dispatch<SetStateAction<boolean>>;
  setHistory: Dispatch<
    SetStateAction<{
      loading: boolean;
      conversation: Conversation | null;
      conversationHistory: Conversation[] | null;
      currentAgent: Agent | null;
    }>
  >;
};

const RenameModal = ({
  isOpen,
  initialValue,
  onClose,
  conversationId,
  setHistory,
  setRenameLoading,
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSave = async (text: string) => {
    try {
      setRenameLoading(true);
      const response = await fetch('/api/conversation/update_title', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: text,
          conversationId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setHistory((prv) => {
        if (!prv.conversationHistory) return prv;

        return {
          ...prv,
          conversationHistory: prv.conversationHistory!.map((c) => {
            if (c._id === result.conversation._id) {
              return { ...c, title: text };
            }

            return c;
          }),
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Random error', err);
      }
    } finally {
      setRenameLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showClasses="opacity-100 scale-100"
      hideClasses="opacity-0 scale-0"
      className="bg-modal-background fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 text-center shadow-lg md:w-[30%]"
    >
      <h3 className="text-quick-cards-heading mb-4 text-lg font-semibold">
        Rename Conversation
      </h3>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter new name"
        className="bg-input-primary-bg border-input-primary-border focus:border-input-focus-border focus:shadow-input-focus-shadow placeholder:text-input-placeholder w-full rounded-md border px-3 py-2 outline-none"
      />

      <div className="mt-5 flex justify-end gap-2">
        <Button
          onClick={onClose}
          className="border-input-primary-border border bg-black text-white hover:bg-white/10"
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            if (!value.trim()) return;
            onSave(value.trim());
            onClose();
          }}
          className="border-input-primary-border bg-button-background transform rounded-md border text-sm tracking-wider text-white transition-all duration-100 ease-linear hover:translate-y-0.5"
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default RenameModal;
