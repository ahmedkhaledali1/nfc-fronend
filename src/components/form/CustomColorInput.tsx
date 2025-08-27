import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

interface CustomColorInputProps {
  name?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  // For standalone usage (without react-hook-form)
  value?: string;
  onChange?: (value: string) => void;
}

function CustomColorInput({
  name,
  label,
  required = false,
  placeholder = '#000000',
  disabled = false,
  value: externalValue,
  onChange: externalOnChange,
}: CustomColorInputProps) {
  // Always call useFormContext, but handle the case where it might not be available
  const formContext = useFormContext();
  const isFormContext = !!name && !!formContext;

  const {
    setValue,
    watch,
    formState: { errors },
  } = formContext || {};

  const error = isFormContext ? get(errors, name!) : null;
  const currentValue = isFormContext ? watch(name!) || '' : externalValue || '';

  const [hexValue, setHexValue] = useState(currentValue);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setHexValue(color);

    if (isFormContext && setValue) {
      setValue(name!, color);
    } else if (externalOnChange) {
      externalOnChange(color);
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setHexValue(hex);

    if (isFormContext && setValue) {
      setValue(name!, hex);
    } else if (externalOnChange) {
      externalOnChange(hex);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name || 'color-input'}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            id={name ? `${name}-color` : 'color-picker'}
            value={currentValue || '#000000'}
            onChange={handleColorChange}
            disabled={disabled}
            className="w-12 h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: currentValue || '#000000',
              border: '1px solid #d1d5db',
            }}
          />
        </div>
        <Input
          id={name || 'color-input'}
          type="text"
          value={hexValue}
          onChange={handleHexChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
          pattern="^#[0-9A-Fa-f]{6}$"
          title="Please enter a valid hex color (e.g., #ff0000)"
        />
      </div>
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomColorInput;
