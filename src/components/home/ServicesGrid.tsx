
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Languages, Phone, Briefcase, CreditCard, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
}

interface ServicesGridProps {
  onServiceSelect: (serviceId: string) => void;
}

const ServicesGrid = ({ onServiceSelect }: ServicesGridProps) => {
  const { t } = useLanguage();

  const services: Service[] = [
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
    },
    {
      id: "first-steps",
      title: "Pierwsze kroki w Holandii",
      description: "Wyszukiwarka biur pracy, ubezpieczeń, mieszkań i innych usług",
      icon: Compass,
      color: "bg-teal-600 dark:bg-teal-500",
      features: ["Biura pracy", "Ubezpieczenia", "Mieszkania", "Telekomunikacja", "Banki"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {services.map((service) => {
        const IconComponent = service.icon;
        return (
          <Card 
            key={service.id} 
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-400 dark:bg-gray-800"
            onClick={() => onServiceSelect(service.id)}
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
  );
};

export default ServicesGrid;
