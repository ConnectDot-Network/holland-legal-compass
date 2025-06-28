import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Scale, MessageSquare, Phone, Briefcase, Languages, Users, MapPin, Clock, User, Moon, Sun, Globe, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LegalAdvisor from "@/components/legal/LegalAdvisor";
import TranslatorAssistant from "@/components/TranslatorAssistant";
import Receptionist from "@/components/Receptionist";
import BusinessAdvisor from "@/components/BusinessAdvisor";
import MoneyTransfer from "@/components/MoneyTransfer";

const Index = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const languages = [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'bg', name: 'Български' },
    { code: 'es', name: 'Español' },
    { code: 'ro', name: 'Română' },
    { code: 'hu', name: 'Magyar' },
    { code: 'lt', name: 'Lietuvių' },
    { code: 'uk', name: 'Українська' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' }
  ];

  const services = [
    {
      id: "legal",
      title: t("legalAdvisor"),
      description: "Specjalista od prawa holenderskiego",
      icon: Scale,
      color: "bg-blue-600 dark:bg-blue-500",
      features: ["Prawo pracy", "Umowy B2B/B2C", "Prawo podatkowe", "Spółki i start-upy"]
    },
    {
      id: "translator",
      title: t("translator"),
      description: "Profesjonalne tłumaczenia prawnicze",
      icon: Languages,
      color: "bg-orange-600 dark:bg-orange-500",
      features: ["Dokumenty urzędowe", "Umowy", "Korespondencja", "Upload dokumentów"]
    },
    {
      id: "receptionist",
      title: t("receptionist"),
      description: "Centrala telefoniczna AI obsługująca do 100 numerów ze sklonowanym głosem (Ringostat)",
      icon: Phone,
      color: "bg-green-600 dark:bg-green-500",
      features: ["Centrala AI", "Sklonowany głos", "Do 100 numerów", "Integracja Ringostat"]
    },
    {
      id: "business",
      title: t("businessAdvisor"),
      description: "Wsparcie w prowadzeniu biznesu w Holandii",
      icon: Briefcase,
      color: "bg-purple-600 dark:bg-purple-500",
      features: ["Zakładanie firmy", "Podatki", "Regulacje", "Rozwój biznesu"]
    },
    {
      id: "money-transfer",
      title: "Przesyłanie Pieniędzy",
      description: "Bezpieczne przelewy między kontami bankowymi przez Stripe",
      icon: CreditCard,
      color: "bg-red-600 dark:bg-red-500",
      features: ["Przelewy bankowe", "Stripe Connect", "Bezpieczne transakcje", "Niskie prowizje"]
    }
  ];

  const renderServiceComponent = () => {
    switch (activeService) {
      case "legal":
        return <LegalAdvisor />;
      case "translator":
        return <TranslatorAssistant />;
      case "receptionist":
        return <Receptionist />;
      case "business":
        return <BusinessAdvisor />;
      case "money-transfer":
        return <MoneyTransfer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/55a07de1-88ca-4dc6-a55f-9722a53173d8.png" 
                alt="ConnectDot.Network Logo" 
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("appTitle")}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("appDescription")}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {t("companyName")} - {t("companyLocation")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
                <SelectTrigger className="w-32">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                />
                <Moon className="w-4 h-4" />
              </div>

              <Badge variant="outline" className="text-green-700 border-green-700 dark:text-green-400 dark:border-green-400">
                <Clock className="w-3 h-3 mr-1" />
                {t("available247")}
              </Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-700 dark:text-blue-400 dark:border-blue-400">
                <MapPin className="w-3 h-3 mr-1" />
                {t("location")}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeService ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {services.find(s => s.id === activeService)?.title}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setActiveService(null)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                ← {t("backToServices")}
              </Button>
            </div>
            {renderServiceComponent()}
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("heroTitle")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t("heroDescription")}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.id} 
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-400 dark:bg-gray-800"
                    onClick={() => setActiveService(service.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl dark:text-white">{service.title}</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-300">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Specjalizacje:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700">
                        {t("startConversation")}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Info Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">1000+ Klientów</h3>
                    <p className="text-blue-100">Zadowolonych użytkowników</p>
                  </div>
                  <div>
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">{t("available247")}</h3>
                    <p className="text-blue-100">Wsparcie przez cały rok</p>
                  </div>
                  <div>
                    <Scale className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Prawo Holenderskie</h3>
                    <p className="text-blue-100">Aktualna wiedza prawnicza</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Section */}
            <Card className="mt-8 dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src="/lovable-uploads/55a07de1-88ca-4dc6-a55f-9722a53173d8.png" 
                    alt="ConnectDot.Network Logo" 
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t("companyName")}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t("companyLocation")}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">AUTOMATION • AI • COPILOT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
