import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

function CustomSwitch({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required: boolean;
}) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={name}
        checked={watch(name)}
        onCheckedChange={(checked) => setValue(name, checked)}
      />
      <Label htmlFor={name} className="text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomSwitch;
