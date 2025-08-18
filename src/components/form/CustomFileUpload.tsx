import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { get, useFormContext } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';

function CustomFileUpload({
  name,
  label,
  required,
  accept = 'image/*',
  preview = false,
  className,
}: {
  name: string;
  label: string;
  required: boolean;
  accept?: string;
  preview?: boolean;
  className?: string;
}) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [dragOver, setDragOver] = React.useState(false);
  const value = watch(name);
  console.log('watch..', watch());
  console.log('value', value);
  // Check if value is a File object or a string URL
  const isFile = value instanceof File;
  const isUrl = typeof value === 'string' && value.length > 0;
  const hasValue = isFile || isUrl;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValue(name, file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0] || null;
    setValue(name, file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = () => {
    setValue(name, null);
  };

  const error = get(errors, name);

  const cleanImagePath = (path: string) => {
    return path
      .replace(/\\/g, '/') // fix slashes
      .replace(/ /g, '%20'); // encode spaces
  };

  // Get image source based on value type
  const getImageSrc = () => {
    if (isFile) {
      return URL.createObjectURL(value);
    }
    if (isUrl) {
      return `${import.meta.env.VITE_BACKEND_DOMAIN}${cleanImagePath(value)}`;
    }
    return '';
  };

  // Get display name based on value type
  const getDisplayName = () => {
    if (isFile) {
      return value.name;
    }
    if (isUrl) {
      return 'Uploaded Image';
    }
    return '';
  };

  return (
    <div className={className}>
      <Label className="text-sm font-medium mb-3 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {hasValue && preview ? (
        <div className="space-y-3">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
            <img
              src={getImageSrc()}
              crossOrigin="anonymous"
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={removeFile}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center hover:bg-destructive/90"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">{getDisplayName()}</p>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-border'
          }`}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id={`file-${name}`}
          />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop your file here, or click to browse
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById(`file-${name}`)?.click()}
          >
            Choose File
          </Button>
        </div>
      )}
      {error && <ErrorMsg error={error.message as string} />}
    </div>
  );
}

export default CustomFileUpload;
