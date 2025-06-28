
import React from 'react';
import { FileAttachment } from "@/types/legal";
import { FileItem } from "./FileItem";

interface AttachmentsListProps {
  attachments: FileAttachment[];
  onRemoveAttachment: (id: string) => void;
}

export const AttachmentsList = ({ attachments, onRemoveAttachment }: AttachmentsListProps) => {
  if (attachments.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm">Załączone pliki ({attachments.length}/10):</h4>
      {attachments.map((attachment) => (
        <FileItem
          key={attachment.id}
          attachment={attachment}
          onRemove={onRemoveAttachment}
        />
      ))}
    </div>
  );
};
