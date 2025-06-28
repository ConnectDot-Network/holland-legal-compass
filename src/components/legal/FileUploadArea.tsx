
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, File, Camera } from "lucide-react";

interface FileUploadAreaProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: () => void;
  onCameraSelect: () => void;
}

export const FileUploadArea = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onCameraSelect
}: FileUploadAreaProps) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-600 mb-2">
        Przeciągnij pliki tutaj lub kliknij aby wybrać
      </p>
      <p className="text-xs text-gray-500 mb-4">
        PDF, obrazy, dokumenty Word (max 10MB, max 10 plików)
      </p>
      <div className="flex gap-2 justify-center">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onFileSelect}
        >
          <File className="w-4 h-4 mr-2" />
          Wybierz pliki
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCameraSelect}
        >
          <Camera className="w-4 h-4 mr-2" />
          Zrób zdjęcie
        </Button>
      </div>
    </div>
  );
};
