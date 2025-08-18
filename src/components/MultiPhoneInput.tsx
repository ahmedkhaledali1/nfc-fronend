import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './form/ErrorMsg';

interface MultiPhoneInputProps {
  label: string;
  value: string[];
  onChange: (phones: string[]) => void;
  required?: boolean;
}

const MultiPhoneInput = ({
  label,
  value,
  onChange,
  required = false,
}: MultiPhoneInputProps) => {
  const { clearErrors } = useFormContext();
  const addPhone = () => {
    onChange([...value, '']);
  };

  const removePhone = (index: number) => {
    const newPhones = value.filter((_, i) => i !== index);
    onChange(newPhones);
  };

  const updatePhone = (index: number, phone: string) => {
    const newPhones = [...value];
    newPhones[index] = phone;
    onChange(newPhones);
    clearErrors(`personalInfo.phoneNumbers.${index}`);
  };

  const {
    formState: { errors },
  } = useFormContext();
  const error = get(errors, 'personalInfo.phoneNumbers');
  // console.log('error...', error);
  return (
    <div>
      <Label className="text-sm font-medium mb-3 block">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="space-y-2">
        {value.map((phone, index) => (
          <>
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={phone}
                onChange={(e) => updatePhone(index, e.target.value)}
                placeholder="+962 XX XXX XXXX"
                className="flex-1"
              />
              {value.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removePhone(index)}
                  className="px-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {error && <ErrorMsg error={error[index]?.message as string} />}
          </>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addPhone}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Phone
        </Button>
      </div>
    </div>
  );
};

export default MultiPhoneInput;
