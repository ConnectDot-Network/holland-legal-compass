
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import InfoSection from "@/components/home/InfoSection";
import CompanySection from "@/components/home/CompanySection";
import ServiceRenderer from "@/components/home/ServiceRenderer";

const Index = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const { t } = useLanguage();

  const services = [
    { id: "legal", title: t("legalAdvisor") },
    { id: "translator", title: t("translator") },
    { id: "receptionist", title: t("receptionist") },
    { id: "business", title: t("businessAdvisor") },
    { id: "money-transfer", title: t("moneyTransfer") },
    { id: "first-steps", title: t("firstSteps") }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />

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
            <ServiceRenderer activeService={activeService} />
          </div>
        ) : (
          <>
            <HeroSection />
            <ServicesGrid onServiceSelect={setActiveService} />
            <InfoSection />
            <CompanySection />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
