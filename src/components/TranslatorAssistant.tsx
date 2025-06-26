
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Languages, FileText, Download, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TranslatorAssistant = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('polish');
  const [targetLanguage, setTargetLanguage] = useState('dutch');
  const [documentType, setDocumentType] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'polish', name: 'Polski' },
    { code: 'dutch', name: 'Niderlandzki' },
    { code: 'english', name: 'Angielski' },
    { code: 'german', name: 'Niemiecki' },
    { code: 'french', name: 'Francuski' }
  ];

  const documentTypes = [
    'Dokument tożsamości',
    'Akt urodzenia',
    'Świadectwo małżeństwa',
    'Dyplom/Certyfikat',
    'Umowa najmu',
    'Umowa o pracę',
    'Dokument medyczny',
    'Dokument sądowy',
    'Korespondencja urzędowa',
    'Inne'
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Błąd",
        description: "Wprowadź tekst do tłumaczenia",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    
    // Simulate translation process
    setTimeout(() => {
      const mockTranslation = generateTranslation(sourceText, sourceLanguage, targetLanguage, documentType);
      setTranslatedText(mockTranslation);
      setIsTranslating(false);
      
      toast({
        title: "Tłumaczenie zakończone",
        description: "Tekst został przetłumaczony pomyślnie",
      });
    }, 2000);
  };

  const generateTranslation = (text: string, from: string, to: string, type: string) => {
    // Tutaj będzie implementacja rzeczywistego tłumaczenia AI
    const translations: Record<string, string> = {
      polish: 'Profesjonalne tłumaczenie zostało wykonane zgodnie z standardami prawniczymi.',
      dutch: 'Professionele vertaling is uitgevoerd volgens juridische standaarden.',
      english: 'Professional translation has been completed according to legal standards.'
    };
    
    return `[TŁUMACZENIE ${type ? `- ${type}` : ''}]

${translations[to] || translations.dutch}

Oryginalny tekst został przetłumaczony z języka ${languages.find(l => l.code === from)?.name} na język ${languages.find(l => l.code === to)?.name}.

Uwagi tłumacza:
- Zachowano strukturę dokumentu
- Zastosowano właściwą terminologię prawniczą
- Tłumaczenie odpowiada wymogom urzędowym

[KONIEC TŁUMACZENIA]`;
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText('');
  };

  return (
    <div className="space-y-6">
      {/* Document Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <span>Typ dokumentu</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz typ dokumentu (opcjonalne)" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <span>Kierunek tłumaczenia</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Z języka:</label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={swapLanguages}
              className="mt-7"
            >
              ⇄
            </Button>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Na język:</label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Tekst oryginalny ({languages.find(l => l.code === sourceLanguage)?.name})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Wklej tutaj tekst do tłumaczenia..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={12}
              className="resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Znaków: {sourceText.length}
              </span>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Wczytaj plik
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Translated Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Tłumaczenie ({languages.find(l => l.code === targetLanguage)?.name})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Tłumaczenie pojawi się tutaj..."
              value={translatedText}
              readOnly
              rows={12}
              className="resize-none bg-gray-50"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {translatedText && (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Gotowe
                  </Badge>
                )}
              </span>
              {translatedText && (
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Translation Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Button 
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 px-8"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Tłumaczę...
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4 mr-2" />
                  Przetłumacz
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Translation Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="font-medium text-blue-900">Certyfikowane tłumaczenia</h4>
              <p className="text-sm text-blue-700">Akceptowane przez urzędy holenderskie</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Terminologia prawnicza</h4>
              <p className="text-sm text-blue-700">Specjalistyczne słownictwo</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Szybka realizacja</h4>
              <p className="text-sm text-blue-700">Natychmiastowe tłumaczenia</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslatorAssistant;
