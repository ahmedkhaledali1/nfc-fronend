import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import ErrorMsg from './ErrorMsg';

interface CustomOptionsInputProps {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

const CustomOptionsInput: React.FC<CustomOptionsInputProps> = ({
  name,
  label,
  required = false,
  placeholder = 'Enter option',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  });

  // Get the current values from the form
  const { watch } = useFormContext();
  const currentValues = watch(name) || [];

  const [newOption, setNewOption] = useState('');
  console.log('currentValues..', currentValues);
  const handleAddOption = () => {
    if (newOption.trim()) {
      append(newOption.trim());
      setNewOption('');
    }
  };

  const handleUpdateOption = (index: number, value: string) => {
    update(index, value);
  };

  const handleRemoveOption = (index: number) => {
    remove(index);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="space-y-2">
        {currentValues.map((value: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={value || ''}
              onChange={(e) => handleUpdateOption(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemoveOption(index)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <Input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddOption}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {errors[name] && <ErrorMsg error={errors[name]?.message as string} />}
    </div>
  );
};

export default CustomOptionsInput;
