
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Clock, User, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Receptionist = () => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState<Array<{
    id: string;
    time: string;
    client: string;
    service: string;
    status: string;
  }>>([
    {
      id: '1',
      time: 'Dziś 14:00',
      client: 'Jan Kowalski',
      service: 'Konsultacja prawna',
      status: 'potwierdzona'
    },
    {
      id: '2', 
      time: 'Jutro 10:30',
      client: 'Anna Nowak',
      service: 'Tłumaczenie dokumentów',
      status: 'oczekująca'
    }
  ]);
  const { toast } = useToast();

  const serviceTypes = [
    'Konsultacja prawna',
    'Tłumaczenie dokumentów',
    'Doradztwo biznesowe',
    'Pomoc w wypełnianiu formularzy',
    'Reprezentacja w urzędzie',
    'Inne'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Niska - można poczekać tydzień', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Średnia - w ciągu 2-3 dni', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Wysoka - jak najszybciej', color: 'bg-red-100 text-red-800' }
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName || !clientPhone || !serviceType) {
      toast({
        title: "Błąd",
        description: "Wypełnij wszystkie wymagane pola",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Zgłoszenie przyjęte",
      description: "Skontaktujemy się z Tobą w ciągu 24 godzin",
    });

    // Reset form
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setServiceType('');
    setUrgency('');
    setMessage('');
  };

  const generateResponse = (inquiry: string) => {
    return `Dzień dobry! Dziękuję za Twoje zapytanie.

Na podstawie Twojej wiadomości: "${inquiry}"

Oto co mogę dla Ciebie zorganizować:

🔹 **Najbliższy dostępny termin**: Jutro o 10:00 lub 14:30
🔹 **Rodzaj konsultacji**: Zależnie od Twojej potrzeby
🔹 **Czas trwania**: 30-60 minut
🔹 **Lokalizacja**: Online lub w naszym biurze w Amsterdamie

**Następne kroki:**
1. Potwierdź preferowany termin
2. Prześlij dokumenty (jeśli dotyczy)
3. Otrzymaj szczegóły spotkania

**Kontakt w nagłych przypadkach:**
📞 Telefon: +31 20 123 4567
📧 Email: kontakt@hollandlegal.nl

Czy któryś z zaproponowanych terminów Ci odpowiada?`;
  };

  return (
    <div className="space-y-6">
      {/* Quick Contact */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <Phone className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold">Telefon</h3>
              <p>+31 20 123 4567</p>
            </div>
            <div>
              <Mail className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold">Email</h3>
              <p>kontakt@hollandlegal.nl</p>
            </div>
            <div>
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold">Godziny pracy</h3>
              <p>Pn-Pt: 9:00-17:00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Umów wizytę</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Imię i nazwisko *</label>
                <Input
                  placeholder="Twoje imię i nazwisko"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Telefon *</label>
                <Input
                  placeholder="+31 6 12345678"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="twoj@email.nl"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rodzaj usługi *</label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz usługę" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pilność sprawy</label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Jak pilna jest sprawa?" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Opis sprawy</label>
                <Textarea
                  placeholder="Opisz krótko swoją sytuację..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <Calendar className="w-4 h-4 mr-2" />
                Wyślij prośbę o kontakt
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Current Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Najbliższe wizyty</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{appointment.client}</div>
                    <div className="text-sm text-gray-600">{appointment.service}</div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </div>
                  <Badge 
                    variant={appointment.status === 'potwierdzona' ? 'default' : 'secondary'}
                    className={appointment.status === 'potwierdzona' ? 'bg-green-600' : ''}
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Dostępne terminy:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-blue-700">• Dziś 16:00</div>
                <div className="text-blue-700">• Jutro 9:30</div>
                <div className="text-blue-700">• Jutro 15:00</div>
                <div className="text-blue-700">• Pojutrze 11:00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Response Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <span>Szybka odpowiedź dla klienta</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Wpisz zapytanie klienta, aby wygenerować profesjonalną odpowiedź..."
              rows={2}
            />
            <Button className="bg-purple-600 hover:bg-purple-700">
              Wygeneruj odpowiedź
            </Button>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Przykładowa odpowiedź:</h4>
              <div className="text-sm text-gray-700 whitespace-pre-line">
                {generateResponse("Potrzebuję pomocy w sprawie wizy")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Receptionist;
