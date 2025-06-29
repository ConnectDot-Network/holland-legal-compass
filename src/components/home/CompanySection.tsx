
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const CompanySection = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default CompanySection;
