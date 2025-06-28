
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Send, FileText, AlertCircle, Globe, Shield, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateWebhookUrl, sanitizeInput, isValidCategory, isValidLanguage } from "@/utils/security";

const LegalAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookError, setWebhookError] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'advisor', message: string, timestamp: Date}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const legalCategories = [
    "Prawo pracy",
    "Umowy B2B/B2C",
    "Prawo podatkowe", 
    "Spółki i start-upy",
    "Nieruchomości",
    "Prawo rodzinne",
    "Spadki",
    "Prawo konsumenckie",
    "RODO / dane osobowe",
    "Mandaty i wykroczenia"
  ];

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

  const handleWebhookUrlChange = (url: string) => {
    setWebhookUrl(url);
    if (url.trim()) {
      const validation = validateWebhookUrl(url);
      setWebhookError(validation.isValid ? '' : validation.error || '');
    } else {
      setWebhookError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const sanitizedQuestion = sanitizeInput(question, 2000);
    if (!sanitizedQuestion.trim()) {
      toast({
        title: "Błąd",
        description: "Pytanie nie może być puste",
        variant: "destructive",
      });
      return;
    }

    if (!category || !isValidCategory(category, legalCategories)) {
      toast({
        title: "Błąd",
        description: "Wybierz prawidłową kategorię",
        variant: "destructive",
      });
      return;
    }

    const selectedLanguage = language || "Polski";
    if (!isValidLanguage(selectedLanguage, languages)) {
      toast({
        title: "Błąd",
        description: "Wybierz prawidłowy język",
        variant: "destructive",
      });
      return;
    }

    // Validate webhook URL if provided
    if (webhookUrl.trim()) {
      const validation = validateWebhookUrl(webhookUrl);
      if (!validation.isValid) {
        toast({
          title: "Błąd Webhook",
          description: validation.error,
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    setQuestion('');
    
    // Add user message to conversation
    const newMessage = { 
      type: 'user' as const, 
      message: sanitizedQuestion, 
      timestamp: new Date() 
    };
    setConversation(prev => [...prev, newMessage]);

    try {
      // Send to webhook if URL is provided and valid
      if (webhookUrl.trim()) {
        const webhookData = {
          question: sanitizedQuestion,
          category: category,
          language: selectedLanguage,
          timestamp: new Date().toISOString()
        };

        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(webhookData),
        });

        toast({
          title: "Wysłano zapytanie",
          description: "Twoje pytanie zostało przekazane do systemu prawniczego",
        });
      }

      // Simulate AI response
      setTimeout(() => {
        const response = generateLegalAdvice(sanitizedQuestion, category, selectedLanguage);
        const responseMessage = {
          type: 'advisor' as const,
          message: response,
          timestamp: new Date()
        };
        setConversation(prev => [...prev, responseMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Błąd wysyłania zapytania");
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać zapytania",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const generateLegalAdvice = (question: string, category: string, language: string) => {
    return `Jako doradca prawny specjalizujący się w prawie holenderskim, w kategorii "${category}", analizuję Twoją sytuację w języku ${language}:

${question}

Na podstawie aktualnego prawa holenderskiego, oto moja analiza:

1. **Kluczowe przepisy**: W Holandii obowiązują szczegółowe regulacje dotyczące tej kwestii...

2. **Twoje prawa**: Zgodnie z holenderskim prawem, masz następujące uprawnienia...

3. **Zalecane działania**: 
   - Zbierz niezbędną dokumentację
   - Rozważ konsultację z lokalnym prawnikiem
   - Sprawdź terminy prawne

4. **Ostrzeżenia**: Zwróć uwagę na potencjalne pułapki prawne...

**Uwaga**: To jest wstępna analiza. W skomplikowanych sprawach zalecam konsultację z certyfikowanym prawnikiem holenderskim.`;
  };

  const handlePrintConversation = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Rozmowa z Doradcą Prawnym - Holland Legal Compass</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ccc; padding-bottom: 20px; }
            .message { margin: 15px 0; padding: 10px; border-radius: 8px; }
            .user { background-color: #e3f2fd; margin-left: 20%; }
            .advisor { background-color: #f5f5f5; margin-right: 20%; }
            .timestamp { font-size: 0.8em; color: #666; margin-top: 5px; }
            .category { font-weight: bold; color: #1976d2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Holland Legal Compass</h1>
            <h2>Rozmowa z Doradcą Prawnym</h2>
            <p class="category">Kategoria: ${category}</p>
            <p>Data wydruku: ${new Date().toLocaleString('pl-PL')}</p>
          </div>
          ${conversation.map(msg => `
            <div class="message ${msg.type}">
              <strong>${msg.type === 'user' ? 'Ty' : 'Doradca Prawny'}:</strong>
              <div>${msg.message.replace(/\n/g, '<br>')}</div>
              <div class="timestamp">${msg.timestamp.toLocaleString('pl-PL')}</div>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const clearConversation = () => {
    setConversation([]);
    toast({
      title: "Wyczyszczono",
      description: "Historia rozmowy została usunięta",
    });
  };

  return (
    <div className="space-y-6">
      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
            <Shield className="w-5 h-5" />
            <div>
              <p className="font-medium">Bezpieczeństwo i Prywatność</p>
              <p className="text-sm">Twoje dane są przetwarzane lokalnie. Webhook URL musi być bezpieczny (HTTPS).</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>Konfiguracja doradcy prawnego</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Webhook URL (n8n) - tylko HTTPS</label>
            <Input
              placeholder="https://twój-webhook.n8n.cloud/webhook/..."
              value={webhookUrl}
              onChange={(e) => handleWebhookUrlChange(e.target.value)}
              className={webhookError ? "border-red-500" : ""}
            />
            {webhookError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {webhookError}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category and Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Wybierz kategorię i język</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kategoria sprawy *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz kategorię sprawy" />
              </SelectTrigger>
              <SelectContent>
                {legalCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Język</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz język" />
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

      {/* Conversation Area */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Rozmowa z doradcą prawnym</CardTitle>
            {conversation.length > 0 && (
              <div className="flex space-x-2">
                <Button
                  onClick={handlePrintConversation}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <FileText className="w-4 h-4" />
                  <span>Drukuj</span>
                </Button>
                <Button
                  onClick={clearConversation}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Wyczyść</span>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {conversation.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Scale className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Zadaj swoje pytanie prawne, aby rozpocząć konsultację</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.message}</div>
                    <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleString('pl-PL')}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span>Doradca analizuje Twoją sprawę...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Twoje pytanie prawne * (max 2000 znaków)</label>
              <Textarea
                placeholder="Opisz swoją sytuację prawną lub zadaj pytanie..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="resize-none"
                maxLength={2000}
                required
              />
              <p className="text-xs text-gray-500 mt-1">{question.length}/2000 znaków</p>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-orange-700 border-orange-700">
                <AlertCircle className="w-3 h-3 mr-1" />
                Porada wstępna - nie zastępuje prawnika
              </Badge>
              <Button 
                type="submit" 
                disabled={!question.trim() || !category || isLoading || !!webhookError}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Rozpocznij rozmowę
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Legal Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Przydatne zasoby</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Oficjalne strony:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rijksoverheid.nl - informacje rządowe</li>
                <li>• Rechtspraak.nl - orzecznictwo</li>
                <li>• IND.nl - sprawy imigracyjne</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Numery alarmowe:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rechtsbijstand: 0900-8020</li>
                <li>• Juridisch Loket: 0900-8020</li>
                <li>• Konsulat Polski: +31 70 360 2806</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalAdvisor;
