
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { FileAttachment } from "@/types/legal";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FileUploadArea } from "./FileUploadArea";
import { AttachmentsList } from "./AttachmentsList";

interface FileUploadProps {
  attachments: FileAttachment[];
  onAttachmentsChange: (attachments: FileAttachment[]) => void;
}

export const FileUpload = ({ attachments, onAttachmentsChange }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const {
    isDragging,
    handleFiles,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeAttachment
  } = useFileUpload(attachments, onAttachmentsChange);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <span>Załączniki</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUploadArea
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileSelect={() => fileInputRef.current?.click()}
          onCameraSelect={() => cameraInputRef.current?.click()}
        />

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        <AttachmentsList
          attachments={attachments}
          onRemoveAttachment={removeAttachment}
        />
      </CardContent>
    </Card>
  );
};
