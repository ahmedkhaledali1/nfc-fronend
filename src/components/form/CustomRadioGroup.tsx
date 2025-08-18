import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

interface Option {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

function CustomRadioGroup({
  name,
  label,
  required,
  options,
  className,
}: {
  name: string;
  label: string;
  required: boolean;
  options: Option[];
  className?: string;
}) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup
        value={watch(name)}
        onValueChange={(value) => setValue(name, value)}
        className={className}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2 p-4 border border-border rounded-lg"
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              disabled={option.disabled}
            />
            <Label
              htmlFor={option.value}
              className={`flex-1 ${
                option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  )}
                </div>
                {option.icon}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomRadioGroup;
