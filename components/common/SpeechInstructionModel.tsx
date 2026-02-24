import { voiceAgentInstructionSchema } from '@/lib/validations/agents.schema';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  setSelectedAgent,
  setVoiceAgentInstruction,
} from '@/features/agents/agentsSlice';

import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '../ui/dialog';
import { DialogContent } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';
import { type Voice_assistant } from '@/utils/voice_assistants';

type PropsType = {
  currentAgent: Voice_assistant | null;
  open: boolean;
  setOpen: (val: boolean) => void;
};

type FormType = z.infer<typeof voiceAgentInstructionSchema>;

const SpeechInstructionModel = ({ currentAgent, open, setOpen }: PropsType) => {
  const dispatch = useAppDispatch();
  const agent = currentAgent!;
  console.log(agent);

  const submitHandler = (data: FormType) => {
    dispatch(setVoiceAgentInstruction(data.instruction));
    dispatch(setSelectedAgent(agent));
    setOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: zodResolver(voiceAgentInstructionSchema),
    shouldUnregister: true,
    mode: 'onBlur',
    defaultValues: {
      instruction: '',
    },
  });

  if (agent === null) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <DialogHeader className="mb-1">
            <DialogTitle>Configure Your Session</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Image
              src={agent.icon}
              alt={`A ${agent.title} AI assistant`}
              height={300}
              width={300}
              quality={100}
              placeholder="blur"
              blurDataURL="/blurImage.png"
              className="h-34 w-34 self-center rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc]"
            />
            <div className="flex flex-col gap-1 text-center">
              <p className="text-lg font-medium">{agent.title}</p>
              <p className="leading-4.5 tracking-wide">{agent.description}</p>
            </div>
          </div>

          <p className="text-sm leading-4.5 tracking-wide">
            {agent.subHeading}
          </p>

          <Textarea
            {...register('instruction', {
              required: 'Instruction is required',
            })}
            aria-invalid={!!errors.instruction}
            className="max-h-36 min-h-26 break-after-all overflow-auto max-md:text-sm md:min-h-24"
            placeholder={agent.placeHolder}
          ></Textarea>

          <DialogFooter>
            <div className="ml-auto flex items-center gap-2">
              <DialogClose type="button" asChild>
                <Button variant={'outline'} className="">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant={'secondary'}
                className="transition-all duration-100 ease-linear active:translate-y-0.5"
              >
                Continue
              </Button>
            </div>
          </DialogFooter>
          {errors.instruction && (
            <p className="text-center font-medium text-red-500">
              {errors.instruction.message}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpeechInstructionModel;
