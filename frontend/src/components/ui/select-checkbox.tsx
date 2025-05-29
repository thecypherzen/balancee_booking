import { cn } from "@/lib/utils";
import { Icon as TriggerIcon, Portal, Viewport } from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";

type BaseProps = {
  className?: string;
  children: React.ReactNode;
  props?: React.ComponentProps<any>;
};

type TriggerProps = BaseProps & {
  size?: "sm" | "default";
};

const SelectCheckTrigger: React.FC<TriggerProps> = ({
  className = "",
  children,
  size = "default",
}) => {
  return (
    <button
      data-slot="scheck-trigger"
      data-size={size}
      className={cn(
        "border-input flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring[3px] focus-visible:ring-ring/50 focus-visible:border-ring cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_[data-value]]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground aria-invalid:ring-desructive/20 shadow-xs data-[size=default]:h-9 data-[size=sm]:h-8 *:data[slot=scheck-trigger]:line-clamp-1",
        className,
      )}
    >
      {children}
      <TriggerIcon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </TriggerIcon>
    </button>
  );
};

const SelectCheckTriggerValue = ({ value }: { value: string }) => {
  return <span data-value>{value}</span>;
};

type ContentProps = BaseProps & {
  position?: "popper";
};

const SelectCheckContent: React.FC<ContentProps> = ({
  position = "popper",
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(("border-1 border-teal-500", className))} {...props}>
      {children}
    </div>
  );
};

export { SelectCheckContent, SelectCheckTrigger, SelectCheckTriggerValue };
