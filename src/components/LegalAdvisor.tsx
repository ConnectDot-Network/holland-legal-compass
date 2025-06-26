
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Send, FileText, AlertCircle, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LegalAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'advisor', message: string}>>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !category) {
      toast({
        title: "Błąd",
        description: "Wypełnij wszystkie wymagane pola",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const userMessage = question;
    setQuestion('');
    
    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', message: userMessage }]);

    // Prepare data for webhook
    const webhookData = {
      question: userMessage,
      category: category,
      language: language || "Polski",
      timestamp: new Date().toISOString()
    };

    try {
      // Send to webhook if URL is provided
      if (webhookUrl) {
        console.log("Sending to webhook:", webhookData);
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
        const response = generateLegalAdvice(userMessage, category, language || "Polski");
        setConversation(prev => [...prev, { type: 'advisor', message: response }]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Błąd wysyłania:", error);
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

  return (
    <div className="space-y-6">
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
            <label className="block text-sm font-medium mb-2">Webhook URL (n8n)</label>
            <Input
              placeholder="Wprowadź URL webhook n8n..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
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
          <CardTitle>Rozmowa z doradcą prawnym</CardTitle>
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
              <label className="block text-sm font-medium mb-2">Twoje pytanie prawne *</label>
              <Textarea
                placeholder="Opisz swoją sytuację prawną lub zadaj pytanie..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="resize-none"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-orange-700 border-orange-700">
                <AlertCircle className="w-3 h-3 mr-1" />
                Porada wstępna - nie zastępuje prawnika
              </Badge>
              <Button 
                type="submit" 
                disabled={!question.trim() || !category || isLoading}
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
