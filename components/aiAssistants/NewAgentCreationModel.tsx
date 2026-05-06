import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  agentCreationPlaceholders,
  logoForAgents,
  TEXT_AGENT_DOMAINS,
} from '@/utils/text_assistants';
import { useForm, Controller } from 'react-hook-form';
import { agentCreationSchema } from '@/lib/validations/agents.schema';
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
import { Spinner } from '@/components/ui/spinner';
import { Agent } from '@/types/agents';
import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  open: boolean;
  setOpen: (val: boolean) => void;
  setAgents: Dispatch<SetStateAction<Agent[]>>;
};

type FromType = z.infer<typeof agentCreationSchema>;

const NewAgentCreationModel = ({ open, setOpen, setAgents }: PropsType) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FromType>({
    resolver: zodResolver(agentCreationSchema),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      domain: '',
      name: '',
      purpose: '',
      style: 'Friendly',
      level: 'Beginner',
    },
  });

  const selectedDomain = watch('domain');
  const dynamicPlaceholder =
    agentCreationPlaceholders[selectedDomain] ||
    'e.g. Describe the role you want this assistant to play';

  const submitHandler = async (data: FromType) => {
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create agent');
      }

      setAgents((prev) => [result.agent, ...prev]);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error creating agent:', err.message);
      } else {
        console.error('Unknown error creating agent:', err);
      }
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-106.25"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <DialogHeader className="mb-1">
            <DialogTitle>Create Your New AI Companion</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row items-center gap-4 md:gap-8">
            <Image
              src={
                logoForAgents[selectedDomain] || '/assistants/general_ai.png'
              }
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
                <Controller
                  name="domain"
                  control={control}
                  rules={{ required: 'Agent domain is required' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-45"
                        aria-invalid={!!errors.domain}
                      >
                        <SelectValue placeholder="Select Domain" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {TEXT_AGENT_DOMAINS.map(
                          ({ category, domains }, index) => {
                            return (
                              <div key={index}>
                                <SelectGroup key={index}>
                                  <SelectLabel>{category}</SelectLabel>
                                  {domains.map((domain) => (
                                    <SelectItem
                                      key={domain.id}
                                      value={domain.key}
                                    >
                                      {domain.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                                <SelectSeparator />
                              </div>
                            );
                          },
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 text-center">
                <Label>Interaction Style</Label>
                <Controller
                  name="style"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select Style" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectItem value="Professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="Friendly">Friendly</SelectItem>
                          <SelectItem value="Strict">Strict</SelectItem>
                          <SelectItem value="Calm">Calm</SelectItem>
                          <SelectItem value="Motivational">
                            Motivational
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-3 text-center">
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              type="text"
              aria-invalid={!!errors.name}
              {...register('name', {
                required: 'Name is required',
              })}
            />
          </div>

          <div className="mt-1 flex flex-col gap-3 text-center">
            <Label htmlFor="role">Agent Role / Purpose</Label>
            <Textarea
              id="role"
              placeholder={dynamicPlaceholder}
              className="max-h-36 min-h-26 break-after-all overflow-auto max-md:text-sm md:min-h-24"
              {...register('purpose', {
                required: 'Role / Purpose is required',
              })}
            ></Textarea>
          </div>

          <div className="mt-1 flex gap-4">
            <Label>
              <span className="hidden md:inline">Your</span> Comfort Level
            </Label>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-45">
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
              )}
            />
          </div>

          <DialogFooter>
            <div className="ml-auto flex items-center gap-2">
              <DialogClose type="button" asChild>
                <Button
                  variant={'outline'}
                  className=""
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => {}}
                type="submit"
                variant={'secondary'}
                disabled={isSubmitting}
                className=""
              >
                {isSubmitting ? (
                  <>
                    <span>Create</span>
                    <Spinner />
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAgentCreationModel;
