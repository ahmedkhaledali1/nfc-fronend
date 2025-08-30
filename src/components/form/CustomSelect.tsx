import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

interface Option {
  value: string;
  label: string;
}

function CustomSelect({
  name,
  label,
  required,
  options,
  placeholder = 'Select an option',
  disabled = false,
}: {
  name: string;
  label: string;
  required: boolean;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const {
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        value={watch(name)}
        onValueChange={(value) => {
          setValue(name, value);
          clearErrors(name);
        }}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomSelect;
