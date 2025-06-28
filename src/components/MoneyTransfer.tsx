
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Send, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";

const MoneyTransfer = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currencies = [
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }
  ];

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !recipientAccount || !recipientName) {
      toast({
        title: "Błąd",
        description: "Wypełnij wszystkie wymagane pola",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: "Błąd",
        description: "Kwota musi być większa od 0",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Symulacja procesu transferu
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Transfer wysłany",
        description: `Przelew ${amount} ${currency} został zainicjowany`,
      });

      // Reset formularza
      setAmount('');
      setRecipientAccount('');
      setRecipientName('');
      setReference('');
    } catch (error) {
      toast({
        title: "Błąd transferu",
        description: "Nie udało się wysłać przelewu. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <CreditCard className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Przesyłanie Pieniędzy</CardTitle>
              <CardDescription className="text-red-100">
                Bezpieczne przelewy międzynarodowe przez Stripe Connect
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Notice */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-400">Bezpieczeństwo</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Wszystkie transakcje są szyfrowane i przetwarzane przez Stripe - 
                wiodącego dostawcę usług płatniczych z certyfikatami PCI DSS Level 1.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Nowy Przelew</span>
          </CardTitle>
          <CardDescription>
            Wypełnij formularz aby wysłać pieniądze na konto bankowe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Kwota *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Waluta</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientName">Nazwa odbiorcy *</Label>
              <Input
                id="recipientName"
                placeholder="Jan Kowalski"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientAccount">Numer konta IBAN *</Label>
              <Input
                id="recipientAccount"
                placeholder="NL91 ABNA 0417 1643 00"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Tytuł przelewu</Label>
              <Input
                id="reference"
                placeholder="Opis przelewu (opcjonalnie)"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Wyślij Przelew
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-1">Bezpieczne</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Szyfrowanie bankowe PCI DSS
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Szybkie</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Przelewy w czasie rzeczywistym
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold mb-1">Niskie Koszty</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Konkurencyjne prowizje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Supported Banks Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Obsługiwane Banki</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Badge variant="outline" className="justify-center p-2">ING Bank</Badge>
            <Badge variant="outline" className="justify-center p-2">ABN AMRO</Badge>
            <Badge variant="outline" className="justify-center p-2">Rabobank</Badge>
            <Badge variant="outline" className="justify-center p-2">SNS Bank</Badge>
            <Badge variant="outline" className="justify-center p-2">ASN Bank</Badge>
            <Badge variant="outline" className="justify-center p-2">Triodos Bank</Badge>
            <Badge variant="outline" className="justify-center p-2">Knab</Badge>
            <Badge variant="outline" className="justify-center p-2">Bunq</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoneyTransfer;
