import { Dialog } from '../ui/dialog';
import { DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Image from 'next/image';
import { voice_assistant } from '@/utils/voice_assistants';

type PropsType = {
  currentAgent: number;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const SpeechInstructionModel = ({ currentAgent, open, setOpen }: PropsType) => {
  const agent = voice_assistant.find((agent) => agent.id === currentAgent)!;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="flex flex-col gap-4 sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center gap-4">
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
          <p className="">{agent.name}</p>
          <p className="-mt-4 text-lg font-medium">{agent.title}</p>
        </div>

        <Label htmlFor="instruction">Give Instruction</Label>
        <Input id="instruction" type="text" />

        <Button variant={'secondary'} className="">
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SpeechInstructionModel;
