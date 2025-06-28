import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, File, Image, X, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileAttachment } from "@/types/legal";
import { validateFile, logSecurityEvent } from "@/utils/security";

interface FileUploadProps {
  attachments: FileAttachment[];
  onAttachmentsChange: (attachments: FileAttachment[]) => void;
}

export const FileUpload = ({ attachments, onAttachmentsChange }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
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
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
              onClick={() => fileInputRef.current?.click()}
            >
              <File className="w-4 h-4 mr-2" />
              Wybierz pliki
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => cameraInputRef.current?.click()}
            >
              <Camera className="w-4 h-4 mr-2" />
              Zrób zdjęcie
            </Button>
          </div>
        </div>

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

        {/* Attachments List */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Załączone pliki ({attachments.length}/10):</h4>
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
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
                  onClick={() => removeAttachment(attachment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
