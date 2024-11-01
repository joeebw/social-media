import { FormControl, FormMessage } from "@/components/ui/form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

interface FormInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type: string;
  isError: boolean;
  className?: string;
}

const FormInputField = ({
  control,
  name,
  label,
  type,
  isError,
  ...rest
}: FormInputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...rest}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              className={clsx(
                isError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-primary focus:border-primary focus:ring-primary"
              )}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
