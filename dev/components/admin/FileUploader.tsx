'use client';

/**
 * FileUploader Component
 * File selection and upload with preview
 */

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, File } from 'lucide-react';
import Image from 'next/image';

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onUpload?: (files: File[]) => Promise<string[]>; // Returns URLs of uploaded files
  onChange?: (urls: string[]) => void;
  value?: string[];
}

export function FileUploader({
  accept = 'image/*',
  multiple = false,
  maxSize = 5,
  onUpload,
  onChange,
  value = [],
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError(null);

    // Validate file sizes
    const oversizedFiles = selectedFiles.filter((file) => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the ${maxSize}MB size limit`);
      return;
    }

    setFiles(selectedFiles);

    // Create previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (!onUpload || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const urls = await onUpload(files);
      setPreviews(urls);
      onChange?.(urls);
      setFiles([]);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange?.(newPreviews);

    if (index < files.length) {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
    }
  };

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold cursor-pointer transition-colors"
      >
        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {accept === 'image/*' ? 'PNG, JPG, GIF up to' : 'Files up to'} {maxSize}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                {isImage(preview) ? (
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <File className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              {files[index] && (
                <p className="text-xs text-gray-600 mt-1 truncate">{files[index].name}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && onUpload && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-gold hover:bg-gold-600 text-navy"
        >
          {uploading ? 'Uploading...' : `Upload ${files.length} ${files.length === 1 ? 'file' : 'files'}`}
        </Button>
      )}

      {/* Selected Files Info */}
      {files.length > 0 && (
        <div className="text-sm text-gray-600">
          <p>{files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
        </div>
      )}
    </div>
  );
}
