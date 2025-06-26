
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, MessageSquare, Phone, Briefcase, Languages, Users, MapPin, Clock } from "lucide-react";
import LegalAdvisor from "@/components/LegalAdvisor";
import TranslatorAssistant from "@/components/TranslatorAssistant";
import Receptionist from "@/components/Receptionist";
import BusinessAdvisor from "@/components/BusinessAdvisor";

const Index = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: "legal",
      title: "Doradca Prawny",
      description: "Specjalista od prawa holenderskiego",
      icon: Scale,
      color: "bg-blue-600",
      features: ["Prawo imigracyjne", "Prawo pracy", "Prawo mieszkaniowe", "Prawo biznesowe"]
    },
    {
      id: "translator",
      title: "Tłumacz-Asystent",
      description: "Profesjonalne tłumaczenia prawnicze",
      icon: Languages,
      color: "bg-orange-600",
      features: ["Dokumenty urzędowe", "Umowy", "Korespondencja", "Certyfikowane tłumaczenia"]
    },
    {
      id: "receptionist",
      title: "Telefonista",
      description: "Zarządzanie kontaktami i rozmowami",
      icon: Phone,
      color: "bg-green-600",
      features: ["Umówienie wizyt", "Informacje ogólne", "Przekierowanie połączeń", "Obsługa klientów"]
    },
    {
      id: "business",
      title: "Doradca Biznesowy",
      description: "Wsparcie w prowadzeniu biznesu w Holandii",
      icon: Briefcase,
      color: "bg-purple-600",
      features: ["Zakładanie firmy", "Podatki", "Regulacje", "Rozwój biznesu"]
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Holland Legal Compass</h1>
                <p className="text-sm text-gray-600">Kompleksowe wsparcie prawne w Holandii</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-700">
                <Clock className="w-3 h-3 mr-1" />
                24/7 Dostępny
              </Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-700">
                <MapPin className="w-3 h-3 mr-1" />
                Holandia
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeService ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                {services.find(s => s.id === activeService)?.title}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setActiveService(null)}
                className="hover:bg-gray-50"
              >
                ← Powrót do usług
              </Button>
            </div>
            {renderServiceComponent()}
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Profesjonalne Wsparcie Prawne w Holandii
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kompleksowe usługi prawnicze, tłumaczeniowe i biznesowe dla osób mieszkających 
                i prowadzących działalność w Holandii. Nasze AI-powered doradcy są dostępni 24/7.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.id} 
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-200"
                    onClick={() => setActiveService(service.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription className="text-gray-600">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-700">Specjalizacje:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700">
                        Rozpocznij rozmowę
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
                    <h3 className="font-bold text-lg">24/7 Dostępność</h3>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
