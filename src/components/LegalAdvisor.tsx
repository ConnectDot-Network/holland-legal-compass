
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Send, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LegalAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'advisor', message: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const legalCategories = [
    "Prawo imigracyjne",
    "Prawo pracy",
    "Prawo mieszkaniowe", 
    "Prawo biznesowe",
    "Prawo rodzinne",
    "Prawo spadkowe",
    "Prawo podatkowe",
    "Inne"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    const userMessage = question;
    setQuestion('');
    
    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', message: userMessage }]);

    // Simulate AI response (tutaj będzie Twój prompt)
    setTimeout(() => {
      const response = generateLegalAdvice(userMessage, category);
      setConversation(prev => [...prev, { type: 'advisor', message: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateLegalAdvice = (question: string, category: string) => {
    // Tutaj będzie implementacja Twojego promptu AI
    return `Jako doradca prawny specjalizujący się w prawie holenderskim, w kategorii "${category}", analizuję Twoją sytuację:

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
      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>Wybierz kategorię prawną</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz obszar prawa" />
            </SelectTrigger>
            <SelectContent>
              {legalCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <Textarea
              placeholder="Opisz swoją sytuację prawną lub zadaj pytanie..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-orange-700 border-orange-700">
                <AlertCircle className="w-3 h-3 mr-1" />
                Porada wstępna - nie zastępuje prawnika
              </Badge>
              <Button 
                type="submit" 
                disabled={!question.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Wyślij pytanie
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
