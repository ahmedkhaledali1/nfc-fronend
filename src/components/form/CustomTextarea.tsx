import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

function CustomTextarea({
  name,
  placeholder,
  label,
  required,
  rows = 3,
}: {
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
  rows?: number;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        id={name}
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomTextarea;
