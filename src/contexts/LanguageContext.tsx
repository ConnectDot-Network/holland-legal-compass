
import React, { createContext, useContext, useState } from 'react';

type Language = 'pl' | 'en' | 'nl' | 'tr' | 'bg' | 'es' | 'ro' | 'hu' | 'lt' | 'uk' | 'fr' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pl: {
    appTitle: "Holland Legal Compass",
    appDescription: "Kompleksowe wsparcie prawne w Holandii",
    available247: "24/7 Dostępny",
    location: "Holandia",
    legalAdvisor: "Doradca Prawny",
    translator: "Tłumacz-Asystent",
    receptionist: "Telefonista",
    businessAdvisor: "Doradca Biznesowy",
    heroTitle: "Profesjonalne Wsparcie Prawne w Holandii",
    heroDescription: "Kompleksowe usługi prawnicze, tłumaczeniowe i biznesowe dla osób mieszkających i prowadzących działalność w Holandii.",
    startConversation: "Rozpocznij rozmowę",
    backToServices: "Powrót do usług",
    companyName: "ConnectDot.Network",
    companyLocation: "Rotterdam, Nederland",
    lightMode: "Tryb jasny",
    darkMode: "Tryb ciemny",
    language: "Język"
  },
  en: {
    appTitle: "Holland Legal Compass",
    appDescription: "Comprehensive legal support in the Netherlands",
    available247: "24/7 Available",
    location: "Netherlands",
    legalAdvisor: "Legal Advisor",
    translator: "Translator-Assistant",
    receptionist: "Receptionist",
    businessAdvisor: "Business Advisor",
    heroTitle: "Professional Legal Support in the Netherlands",
    heroDescription: "Comprehensive legal, translation and business services for people living and doing business in the Netherlands.",
    startConversation: "Start conversation",
    backToServices: "Back to services",
    companyName: "ConnectDot.Network",
    companyLocation: "Rotterdam, Nederland",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    language: "Language"
  },
  nl: {
    appTitle: "Holland Legal Compass",
    appDescription: "Uitgebreide juridische ondersteuning in Nederland",
    available247: "24/7 Beschikbaar",
    location: "Nederland",
    legalAdvisor: "Juridisch Adviseur",
    translator: "Vertaler-Assistent",
    receptionist: "Receptionist",
    businessAdvisor: "Bedrijfsadviseur",
    heroTitle: "Professionele Juridische Ondersteuning in Nederland",
    heroDescription: "Uitgebreide juridische, vertaal- en bedrijfsdiensten voor mensen die in Nederland wonen en zaken doen.",
    startConversation: "Start gesprek",
    backToServices: "Terug naar diensten",
    companyName: "ConnectDot.Network",
    companyLocation: "Rotterdam, Nederland",
    lightMode: "Lichte modus",
    darkMode: "Donkere modus",
    language: "Taal"
  },
  tr: {
    appTitle: "Holland Legal Compass",
    appDescription: "Hollanda'da kapsamlı hukuki destek",
    available247: "24/7 Müsait",
    location: "Hollanda",
    legalAdvisor: "Hukuk Danışmanı",
    translator: "Çevirmen-Asistan",
    receptionist: "Resepsiyon",
    businessAdvisor: "İş Danışmanı",
    heroTitle: "Hollanda'da Profesyonel Hukuki Destek",
    heroDescription: "Hollanda'da yaşayan ve iş yapan kişiler için kapsamlı hukuki, çeviri ve iş danışmanlığı hizmetleri.",
    startConversation: "Konuşmaya başla",
    backToServices: "Hizmetlere geri dön",
    companyName: "ConnectDot.Network",
    companyLocation: "Rotterdam, Nederland",
    lightMode: "Açık mod",
    darkMode: "Koyu mod",
    language: "Dil"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pl');

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['pl']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
