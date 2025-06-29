
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {t("heroTitle")}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {t("heroDescription")}
      </p>
    </div>
  );
};

export default HeroSection;
