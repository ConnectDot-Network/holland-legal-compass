
import React from 'react';
import { Button } from "@/components/ui/button";
import { File, Image, X } from "lucide-react";
import { FileAttachment } from "@/types/legal";
import { formatFileSize, getFileTypeCategory } from "@/utils/fileUtils";

interface FileItemProps {
  attachment: FileAttachment;
  onRemove: (id: string) => void;
}

export const FileItem = ({ attachment, onRemove }: FileItemProps) => {
  const getFileIcon = (type: string) => {
    return getFileTypeCategory(type) === 'image' 
      ? <Image className="w-4 h-4" />
      : <File className="w-4 h-4" />;
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <div className="flex items-center space-x-2">
        {getFileIcon(attachment.type)}
        <div>
          <p className="text-sm font-medium">{attachment.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onRemove(attachment.id)}
        className="text-red-500 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
