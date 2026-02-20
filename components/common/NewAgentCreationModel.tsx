import { TEXT_AGENT_DOMAINS, type domainType } from '@/utils/text_assistants';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';

type PropsType = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const NewAgentCreationModel = ({ open, setOpen }: PropsType) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <form className="flex flex-col gap-5">
          <DialogHeader className="mb-1">
            <DialogTitle>Create Your New AI Companion</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row items-center gap-4 md:gap-8">
            <Image
              src="/assistants/general_ai.png"
              alt={`A general AI assistant`}
              height={300}
              width={300}
              quality={100}
              placeholder="blur"
              blurDataURL="/blurImage.png"
              className="h-26 w-26 self-center rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc] md:h-34 md:w-34"
            />
            <div className="flex flex-col gap-4 text-center">
              <div className="flex flex-col gap-2 text-center">
                <Label>Agent Domain</Label>
                <Select>
                  <SelectTrigger className="w-[180px]" aria-invalid>
                    <SelectValue placeholder="Select Domain" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {TEXT_AGENT_DOMAINS.map(({ category, domains }, index) => {
                      return (
                        <div key={index}>
                          <SelectGroup key={index}>
                            <SelectLabel>{category}</SelectLabel>
                            {domains.map((domain) => (
                              <SelectItem key={domain.id} value={domain.name}>
                                {domain.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectSeparator />
                        </div>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 text-center">
                <Label>Interaction Style</Label>
                <Select>
                  <SelectTrigger className="w-[180px]" aria-invalid>
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Strict">Strict</SelectItem>
                      <SelectItem value="Calm">Calm</SelectItem>
                      <SelectItem value="Motivational">Motivational</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-3 text-center">
            <Label htmlFor="name">Agent Name</Label>
            <Input id="name" type="text" />
          </div>

          <div className="mt-1 flex flex-col gap-3 text-center">
            <Label htmlFor="role">Agent Role / Purpose</Label>
            <Textarea id="role" className="max-h-32 break-after-all"></Textarea>
          </div>

          <div className="mt-1 flex gap-4">
            <Label>
              <span className="hidden md:inline">Your</span> Comfort Level
            </Label>
            <Select defaultValue="Beginner">
              <SelectTrigger className="w-[180px]" aria-invalid>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <div className="ml-auto flex items-center gap-2">
              <DialogClose type="button" asChild>
                <Button variant={'outline'} className="">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => {}}
                type="button"
                variant={'secondary'}
                className=""
              >
                Create
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAgentCreationModel;
