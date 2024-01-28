// https://react-hook-form.com/ts#Control
import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
};

export const CustomFormField: React.FC<CustomFormFieldProps> = ({
  name,
  control,
}): React.ReactElement => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="capitalize">{name}</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-background shadow-lg dark:shadow-md dark:shadow-cyan-800"
              />
            </FormControl>
            <FormMessage className="dark:text-red-600" />
          </FormItem>
        );
      }}
    />
  );
};

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: string[];
  labelText?: string;
};

export const CustomFormSelect: React.FC<CustomFormSelectProps> = ({
  name,
  control,
  items,
  labelText,
}): React.ReactElement => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="capitalize">{labelText ?? name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-background shadow-lg dark:shadow-md dark:shadow-cyan-800">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item) => {
                  return (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <FormMessage className="dark:text-red-600" />
          </FormItem>
        );
      }}
    />
  );
};
