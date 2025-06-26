
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, TrendingUp, Euro, FileText, Building, Users, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessAdvisor = () => {
  const [businessType, setBusinessType] = useState('');
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'advisor', message: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const businessTypes = [
    'Jednoosobowa działalność (Eenmanszaak)',
    'Spółka z o.o. (BV)',
    'Spółka akcyjna (NV)',
    'Spółka partnerska (VOF)',
    'Spółka komandytowa (CV)',
    'Stowarzyszenie',
    'Fundacja',
    'Inne'
  ];

  const businessCategories = [
    { name: 'Zakładanie firmy', icon: Building, color: 'bg-blue-600' },
    { name: 'Podatki i księgowość', icon: Calculator, color: 'bg-green-600' },
    { name: 'Zatrudnianie pracowników', icon: Users, color: 'bg-purple-600' },
    { name: 'Finansowanie i dotacje', icon: Euro, color: 'bg-orange-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    const userMessage = question;
    setQuestion('');
    
    setConversation(prev => [...prev, { type: 'user', message: userMessage }]);

    setTimeout(() => {
      const response = generateBusinessAdvice(userMessage, businessType);
      setConversation(prev => [...prev, { type: 'advisor', message: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBusinessAdvice = (question: string, type: string) => {
    return `Jako doradca biznesowy specjalizujący się w holenderskim rynku, analizuję Twoją sytuację:

**Twoje pytanie:** ${question}
**Forma prawna:** ${type || 'Do określenia'}

## Analiza i rekomendacje:

### 1. Regulacje prawne w Holandii
- **Kamer van Koophandel (KvK)**: Obowiązkowa rejestracja wszystkich firm
- **BTW (VAT)**: Automatyczna rejestracja przy obrotach >€1,345
- **Podatek dochodowy**: Stawki 37.07% (do €73,031) i 49.5% (powyżej)

### 2. Zalecane działania
✅ **Natychmiastowe:**
- Rejestracja w KvK (koszt €51.70)
- Otwarcie rachunku bankowego firmowego
- Ubezpieczenie odpowiedzialności zawodowej

✅ **W ciągu miesiąca:**
- Kontakt z księgowym
- Założenie systemu fakturowania
- Opracowanie biznesplanu

### 3. Koszty rozpoczęcia działalności
- Rejestracja KvK: €51.70
- Notar (dla BV): €500-1,500
- Kapitał zakładowy (BV): minimum €0.01
- Księgowy: €150-300/miesiąc

### 4. Przydatne zasoby
- **Belastingdienst.nl** - informacje podatkowe
- **KvK.nl** - rejestracja firmy
- **RVO.nl** - dotacje i wsparcie

**Uwaga:** To wstępna analiza. Szczegółowe kwestie wymagają konsultacji z lokalnym doradcą podatkowym.`;
  };

  return (
    <div className="space-y-6">
      {/* Business Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <span>Forma prawna działalności</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz formę prawną" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Czat</TabsTrigger>
          <TabsTrigger value="calculator">Kalkulator</TabsTrigger>
          <TabsTrigger value="resources">Zasoby</TabsTrigger>
          <TabsTrigger value="checklist">Lista kontrolna</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          {/* Chat Interface */}
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>Rozmowa z doradcą biznesowym</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversation.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Zadaj pytanie o prowadzenie biznesu w Holandii</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {businessCategories.map((category) => (
                      <div key={category.name} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center mb-2`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-medium text-sm">{category.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-purple-600 text-white' 
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
                          <div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
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
                  placeholder="Zadaj pytanie o biznes w Holandii..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={!question.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Wyślij pytanie
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span>Kalkulator kosztów biznesowych</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Miesięczny przychód (€)</label>
                  <Input placeholder="5000" type="number" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Koszty miesięczne (€)</label>
                  <Input placeholder="2000" type="number" />
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Szacowane obciążenia:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Podatek dochodowy (37%):</span>
                    <span className="font-medium">€1,110</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTW (21%):</span>
                    <span className="font-medium">€1,050</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ubezpieczenia społeczne:</span>
                    <span className="font-medium">€580</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Zysk netto:</span>
                    <span>€2,260</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Urzędy i instytucje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Kamer van Koophandel</span>
                  <Badge variant="outline">kvk.nl</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Belastingdienst</span>
                  <Badge variant="outline">belastingdienst.nl</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>RVO (dotacje)</span>
                  <Badge variant="outline">rvo.nl</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>UWV (ubezpieczenia)</span>
                  <Badge variant="outline">uwv.nl</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontakty alarmowe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>KvK Helpdesk</span>
                  <Badge variant="outline">0800-1818</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Belastingtelefoon</span>
                  <Badge variant="outline">0800-0543</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>UWV Contact</span>
                  <Badge variant="outline">0800-9899</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Lista kontrolna zakładania firmy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Przed rozpoczęciem:</h4>
                  <div className="space-y-1 text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Wybór formy prawnej</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Wybór nazwy firmy</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Sprawdzenie dostępności nazwy</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Rejestracja:</h4>
                  <div className="space-y-1 text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Rejestracja w KvK</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Uzyskanie numeru RSIN</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Rejestracja VAT (jeśli dotyczy)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Po rejestracji:</h4>
                  <div className="space-y-1 text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Otwarcie konta bankowego</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Ubezpieczenie firmy</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Znalezienie księgowego</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessAdvisor;
