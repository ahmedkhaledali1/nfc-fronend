
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  onFileChange: (file: File | null) => void;
  value?: File | null;
  preview?: boolean;
  className?: string;
}

const FileUpload = ({ label, accept = "image/*", onFileChange, value, preview = false, className }: FileUploadProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0] || null;
    onFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <div className={className}>
      <Label className="text-sm font-medium mb-3 block">{label}</Label>
      
      {value && preview ? (
        <div className="space-y-3">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
            <img 
              src={URL.createObjectURL(value)} 
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
          <p className="text-xs text-muted-foreground">{value.name}</p>
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
            id={`file-${label}`}
          />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop your file here, or click to browse
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById(`file-${label}`)?.click()}
          >
            Choose File
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
