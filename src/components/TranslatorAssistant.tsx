
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Send, FileText, Upload, Camera, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const TranslatorAssistant = () => {
  const [text, setText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const languages = [
    "Polski",
    "Turecki", 
    "Bułgarski",
    "Angielski",
    "Hiszpański",
    "Rumuński",
    "Holenderski",
    "Węgierski",
    "Litewski",
    "Ukraiński",
    "Francuski",
    "Włoski"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // For images, we could implement OCR here
        toast({
          title: t("photoUploaded"),
          description: `${file.name} - ${t("readyForTextAnalysis")}`,
        });
      } else {
        toast({
          title: t("documentUploaded"),
          description: `${file.name} - ${t("readyForTranslation")}`,
        });
      }
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && uploadedFiles.length === 0) {
      toast({
        title: t("error"),
        description: t("enterTextOrUpload"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate translation process
    setTimeout(() => {
      const mockTranslation = generateTranslation(text, sourceLanguage, targetLanguage);
      setTranslation(mockTranslation);
      setIsLoading(false);
      
      toast({
        title: t("translationCompleted"),
        description: t("textTranslated"),
      });
    }, 2000);
  };

  const generateTranslation = (text: string, from: string, to: string) => {
    return `[Tłumaczenie z ${from || 'wykrytego języka'} na ${to || 'wybrany język'}]

${text}

---

To jest przykładowe tłumaczenie Twojego tekstu. W rzeczywistej aplikacji tutaj byłby profesjonalny przekład wykonany przez AI lub tłumacza.

**Uwaga**: Dla dokumentów prawnych zalecamy weryfikację przez certyfikowanego tłumacza przysięgłego.`;
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-orange-600" />
            <span>{t("translatorTitle")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("sourceLanguage")}</label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger>
                <SelectValue placeholder={t("autoDetect")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{t("autoDetect")}</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("targetLanguage")}</label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectTargetLanguage")} />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-orange-600" />
            <span>{t("uploadDocuments")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>{t("uploadDocument")}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.accept = "image/*";
                  fileInputRef.current.click();
                }
              }}
              className="flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>{t("takePhoto")}</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">{t("uploadedFiles")}</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('image/') ? (
                        <Image className="w-4 h-4 text-blue-600" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </Badge>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Text Input */}
      <Card>
        <CardHeader>
          <CardTitle>{t("textToTranslate")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder={t("textPlaceholder")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-blue-700 border-blue-700">
                <Languages className="w-3 h-3 mr-1" />
                {t("professionalTranslations")}
              </Badge>
              <Button 
                type="submit" 
                disabled={(!text.trim() && uploadedFiles.length === 0) || isLoading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? t("translating") : t("translate")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Translation Result */}
      {(translation || isLoading) && (
        <Card>
          <CardHeader>
            <CardTitle>{t("translationResult")}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center space-x-2 py-8">
                <div className="animate-spin w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full"></div>
                <span>{t("translationInProgress")}</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="whitespace-pre-wrap">{translation}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    {t("exportPDF")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("copyTranslation")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Translation Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>{t("translationServices")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">{t("specializedTranslations")}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t("officialDocumentsDetail")}</li>
                <li>• {t("contractsAndAgreements")}</li>
                <li>• {t("notarialActs")}</li>
                <li>• {t("medicalDocuments")}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">{t("technicalSupport")}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t("ocrFromPhotos")}</li>
                <li>• {t("handwritingRecognition")}</li>
                <li>• {t("certifiedTranslations")}</li>
                <li>• {t("support247")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslatorAssistant;
