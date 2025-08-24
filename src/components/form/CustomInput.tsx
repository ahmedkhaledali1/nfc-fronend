import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

function CustomInput({
  name,
  placeholder,
  label,
  required,
  type = 'text',
}: {
  name: string;
  placeholder: string;
  label?: string;
  required: boolean;
  type: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        {...register(name, {
          valueAsNumber: type === 'number',
        })}
        placeholder={placeholder}
      />
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomInput;
