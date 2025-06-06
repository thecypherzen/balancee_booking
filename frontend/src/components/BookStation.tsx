import React, { useState } from "react";
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
  FormDescription,
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

// Form schema
const FormSchema = z.object({
  date: z.date({
    required_error: "date is required",
  }),
});

// Book Station
const BookStation = () => {
  const BookingForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const FormOnSubmit = (data: z.infer<typeof FormSchema>) => {
    toast(`Success`, {
      duration: Infinity,
      description: `${format(data.date, "PPPP")}`,
      action: {
        label: <CircleXIcon />,
        onClick: () => console.log("closed"),
      },
      classNames: {
        actionButton: "!bg-transparent !text-primary-foreground",
      },
    });
  };

  return (
    <Form {...BookingForm}>
      <form
        onSubmit={BookingForm.handleSubmit(FormOnSubmit)}
        className="space-y-8"
      >
        <FormField
          name="date"
          control={BookingForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule an appointment </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        "text-white/90 text-left justify-start w-auto !px-4 cursor-pointer",
                        !field.value && "text-muted-foreground",
                      )}
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={field.value}
                    onSelect={field.onChange}
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={`cursor-pointer`}>
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
