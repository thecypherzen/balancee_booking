import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CircleXIcon } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "@/hooks/ThemeContext";

// Form schema
const FormSchema = z.object({
  date: z.date({
    required_error: "date is required",
  }),
});

// Book Station
const BookStation = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { theme } = useTheme();
  const BookingForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // form submit handler
  const FormOnSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    // toast default state
    const toastId = toast.loading(`Processing...`, {
      duration: Infinity,
      description: "Hold on while we submit your booking",
      action: {
        label: <CircleXIcon />,
        onClick: () => console.log("closed"),
      },
      classNames: {
        actionButton: "!bg-transparent !text-primary-foreground",
      },
    });

    // Modify toast on success
    setTimeout(() => {
      toast.success("Succcess", {
        duration: 3000,
        description: `Your booking for ${format(data.date, "PPPP")} was successful`,
        id: toastId,
        action: {
          label: <CircleXIcon />,
          onClick: () => console.log("closed"),
        },
        classNames: {
          toast: "!bg-green-500 !text-white/90",
          actionButton: "!bg-transparent !text-white/90",
          description: "!text-white/90",
        },
      });
    }, 5000);

    // enable form after processing success
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5100);
  };

  return (
    <Form {...BookingForm}>
      <form
        onSubmit={BookingForm.handleSubmit(FormOnSubmit)}
        className="space-y-5 w-full"
      >
        <FormField
          name="date"
          control={BookingForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 text-primary/60 dark:text-secondary/80">
                Select date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        "text-primary/80 text-left flex justify-start !px-4 cursor-pointer w-full lg:w-4/5",
                        !field.value && "text-muted-foreground",
                      )}
                      disabled={isSubmitting}
                      variant="outline"
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  data-theme={theme}
                  className="w-auto p-0 dark:bg-zinc-800"
                  align="start"
                >
                  <Calendar
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    mode="single"
                    className="[&_td>button]:hover:cursor-pointer"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`cursor-pointer dark:bg-secondary dark:text-primary dark:hover:bg-secondary/70 dark:hover:text-primary/80`}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

//const BookButton = React.forwardRef<HTMLButtonElement, BookButtonProps>(
//  ({ className = "", ...props }, ref) => {
//    return (
//     <Button ref={ref} className={cn("bg-primary/80", className)} {...props}>
//        Book Us Now
//      </Button>
//    );
//  },
// );
//
//type BookButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
//  className?: string;
//};

export default BookStation;
