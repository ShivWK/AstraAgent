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
import { voice_assistant } from '@/utils/voice_assistants';

type PropsType = {
  currentAgent: number;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const continueClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
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
            className="max-h-36 min-h-24 break-after-all overflow-auto"
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
                onClick={continueClickHandler}
                type="button"
                variant={'secondary'}
                className=""
              >
                Continue
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpeechInstructionModel;
