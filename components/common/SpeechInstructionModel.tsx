import { Dialog, DialogHeader, DialogFooter, DialogTitle } from '../ui/dialog';
import { DialogContent } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
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
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <form className="flex flex-col gap-5">
          <DialogHeader className="mb-1">
            <DialogTitle>Configure Your Session</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-5 md:flex-row">
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

          <p className="text-sm leading-5 tracking-wide">{agent.subHeading}</p>
          <Textarea
            className="max-h-30 min-h-24 break-after-all overflow-auto"
            placeholder="Give instructions"
          ></Textarea>

          <DialogFooter>
            <div className="ml-auto flex items-center gap-2">
              <Button variant={'outline'} className="">
                Cancel
              </Button>
              <Button variant={'secondary'} className="">
                Start Session
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpeechInstructionModel;
