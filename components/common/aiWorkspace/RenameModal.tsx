import Modal from '../Modal';
import { useState, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Conversation } from '@/types/conversation';
import { type Agent } from '@/types/agents';

type Props = {
  isOpen: boolean;
  initialValue: string;
  onClose: () => void;
  conversationId: string;
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
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSave = async (text: string) => {
    try {
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
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showClasses="opacity-100 scale-100"
      hideClasses="opacity-0 scale-0"
      className="fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-blue-900 p-6 text-center shadow-lg md:w-[30%]"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">
        Rename Conversation
      </h3>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter new name"
        className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-white outline-none focus:border-blue-500"
      />

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!value.trim()) return;
            onSave(value.trim());
            onClose();
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default RenameModal;
