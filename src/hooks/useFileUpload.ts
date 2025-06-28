
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FileAttachment } from "@/types/legal";
import { validateFile, logSecurityEvent } from "@/utils/security";

export const useFileUpload = (
  attachments: FileAttachment[],
  onAttachmentsChange: (attachments: FileAttachment[]) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate each file
    fileArray.forEach(file => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
        logSecurityEvent('FILE_VALIDATION_FAILED', {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          error: validation.error
        });
      }
    });

    // Show errors if any
    if (errors.length > 0) {
      toast({
        title: "Błędy walidacji plików",
        description: errors.join(', '),
        variant: "destructive",
      });
    }
    
    if (validFiles.length === 0) return;

    // Check total attachments limit
    if (attachments.length + validFiles.length > 10) {
      toast({
        title: "Za dużo plików",
        description: "Maksymalnie 10 plików na raz",
        variant: "destructive",
      });
      return;
    }

    const newAttachments: FileAttachment[] = validFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedAt: new Date()
    }));

    onAttachmentsChange([...attachments, ...newAttachments]);
    
    toast({
      title: "Pliki dodane",
      description: `Dodano ${validFiles.length} plik(ów)`,
    });

    logSecurityEvent('FILES_UPLOADED', {
      count: validFiles.length,
      totalSize: validFiles.reduce((sum, file) => sum + file.size, 0)
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeAttachment = (id: string) => {
    const attachment = attachments.find(att => att.id === id);
    if (attachment) {
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(attachment.url);
    }
    
    const updatedAttachments = attachments.filter(att => att.id !== id);
    onAttachmentsChange(updatedAttachments);
    
    toast({
      title: "Plik usunięty",
      description: "Załącznik został usunięty",
    });
  };

  return {
    isDragging,
    handleFiles,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeAttachment
  };
};
