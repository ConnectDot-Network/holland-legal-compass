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
    language: "Język",
    
    // Services
    moneyTransfer: "Przesyłanie Pieniędzy",
    firstSteps: "Pierwsze kroki w Holandii",
    
    // Legal Categories
    legalCategoriesTitle: "Wybierz kategorię i język",
    selectCategory: "Kategoria sprawy *",
    selectCategoryPlaceholder: "Wybierz kategorię sprawy",
    selectLanguage: "Język",
    selectLanguagePlaceholder: "Wybierz język",
    
    // Legal Form
    questionLabel: "Twoje pytanie prawne * (max 2000 znaków)",
    questionPlaceholder: "Opisz swoją sytuację prawną lub zadaj pytanie...",
    charactersCount: "znaków",
    disclaimerText: "Porada wstępna - nie zastępuje prawnika",
    startConversationBtn: "Rozpocznij rozmowę",
    
    // First Steps Holland
    firstStepsTitle: "Pierwsze kroki w Holandii",
    firstStepsDescription: "Znajdź wszystkie niezbędne usługi potrzebne w pierwszych miesiącach pobytu",
    serviceSearchTitle: "Wyszukiwarka usług",
    category: "Kategoria",
    selectCategoryGeneral: "Wybierz kategorię",
    region: "Region",
    allRegions: "Wszystkie regiony",
    searchLabel: "Wyszukaj",
    searchPlaceholder: "Nazwa lub usługa...",
    categories: "Kategorie",
    searchResults: "Wyniki wyszukiwania",
    noResults: "Brak wyników dla wybranych kryteriów",
    selectCategoryToSee: "Wybierz kategorię aby zobaczyć wyniki",
    services: "usług",
    usefulTips: "Przydatne wskazówki",
    
    // Categories
    workOffices: "Biura pracy",
    insurance: "Ubezpieczenia",
    housing: "Mieszkania",
    telecom: "Telekomunikacja",
    banking: "Banki",
    
    // Translator
    translatorTitle: "Wybierz języki",
    sourceLanguage: "Język źródłowy",
    targetLanguage: "Język docelowy",
    autoDetect: "Automatyczne wykrywanie",
    selectTargetLanguage: "Wybierz język docelowy",
    uploadDocuments: "Załaduj dokumenty lub zdjęcia",
    uploadDocument: "Załaduj dokument",
    takePhoto: "Zrób zdjęcie",
    uploadedFiles: "Załadowane pliki:",
    textToTranslate: "Tekst do tłumaczenia",
    textPlaceholder: "Wprowadź tekst do tłumaczenia lub załaduj dokument powyżej...",
    professionalTranslations: "Profesjonalne tłumaczenia",
    translate: "Przetłumacz",
    translating: "Tłumaczę...",
    translationResult: "Wynik tłumaczenia",
    translationInProgress: "Tłumaczenie w toku...",
    exportPDF: "Eksportuj PDF",
    copyTranslation: "Kopiuj tłumaczenie",
    translationServices: "Usługi tłumaczeniowe",
    specializedTranslations: "Specjalistyczne tłumaczenia:",
    technicalSupport: "Wsparcie techniczne:"
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
    language: "Language",
    
    // Services
    moneyTransfer: "Money Transfer",
    firstSteps: "First Steps in Holland",
    
    // Legal Categories
    legalCategoriesTitle: "Select category and language",
    selectCategory: "Case category *",
    selectCategoryPlaceholder: "Select case category",
    selectLanguage: "Language",
    selectLanguagePlaceholder: "Select language",
    
    // Legal Form
    questionLabel: "Your legal question * (max 2000 characters)",
    questionPlaceholder: "Describe your legal situation or ask a question...",
    charactersCount: "characters",
    disclaimerText: "Preliminary advice - does not replace a lawyer",
    startConversationBtn: "Start conversation",
    
    // First Steps Holland
    firstStepsTitle: "First Steps in Holland",
    firstStepsDescription: "Find all essential services needed in your first months of stay",
    serviceSearchTitle: "Service Search",
    category: "Category",
    selectCategoryGeneral: "Select category",
    region: "Region",
    allRegions: "All regions",
    searchLabel: "Search",
    searchPlaceholder: "Name or service...",
    categories: "Categories",
    searchResults: "Search Results",
    noResults: "No results for selected criteria",
    selectCategoryToSee: "Select category to see results",
    services: "services",
    usefulTips: "Useful Tips",
    
    // Categories
    workOffices: "Job Agencies",
    insurance: "Insurance",
    housing: "Housing",
    telecom: "Telecommunications",
    banking: "Banking",
    
    // Translator
    translatorTitle: "Select languages",
    sourceLanguage: "Source language",
    targetLanguage: "Target language",
    autoDetect: "Auto-detect",
    selectTargetLanguage: "Select target language",
    uploadDocuments: "Upload documents or photos",
    uploadDocument: "Upload document",
    takePhoto: "Take photo",
    uploadedFiles: "Uploaded files:",
    textToTranslate: "Text to translate",
    textPlaceholder: "Enter text to translate or upload document above...",
    professionalTranslations: "Professional translations",
    translate: "Translate",
    translating: "Translating...",
    translationResult: "Translation result",
    translationInProgress: "Translation in progress...",
    exportPDF: "Export PDF",
    copyTranslation: "Copy translation",
    translationServices: "Translation services",
    specializedTranslations: "Specialized translations:",
    technicalSupport: "Technical support:"
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
    language: "Taal",
    
    // Services
    moneyTransfer: "Geldtransfer",
    firstSteps: "Eerste Stappen in Nederland",
    
    // Legal Categories
    legalCategoriesTitle: "Selecteer categorie en taal",
    selectCategory: "Zaak categorie *",
    selectCategoryPlaceholder: "Selecteer zaak categorie",
    selectLanguage: "Taal",
    selectLanguagePlaceholder: "Selecteer taal",
    
    // Legal Form
    questionLabel: "Uw juridische vraag * (max 2000 karakters)",
    questionPlaceholder: "Beschrijf uw juridische situatie of stel een vraag...",
    charactersCount: "karakters",
    disclaimerText: "Voorlopig advies - vervangt geen advocaat",
    startConversationBtn: "Start gesprek",
    
    // First Steps Holland
    firstStepsTitle: "Eerste Stappen in Nederland",
    firstStepsDescription: "Vind alle essentiële diensten die nodig zijn in uw eerste maanden van verblijf",
    serviceSearchTitle: "Service Zoeken",
    category: "Categorie",
    selectCategoryGeneral: "Selecteer categorie",
    region: "Regio",
    allRegions: "Alle regio's",
    searchLabel: "Zoeken",
    searchPlaceholder: "Naam of service...",
    categories: "Categorieën",
    searchResults: "Zoekresultaten",
    noResults: "Geen resultaten voor geselecteerde criteria",
    selectCategoryToSee: "Selecteer categorie om resultaten te zien",
    services: "diensten",
    usefulTips: "Nuttige Tips",
    
    // Categories
    workOffices: "Uitzendbureaus",
    insurance: "Verzekeringen",
    housing: "Huisvesting",
    telecom: "Telecommunicatie",
    banking: "Bankieren",
    
    // Translator
    translatorTitle: "Selecteer talen",
    sourceLanguage: "Brontaal",
    targetLanguage: "Doeltaal",
    autoDetect: "Automatisch detecteren",
    selectTargetLanguage: "Selecteer doeltaal",
    uploadDocuments: "Upload documenten of foto's",
    uploadDocument: "Upload document",
    takePhoto: "Foto maken",
    uploadedFiles: "Geüploade bestanden:",
    textToTranslate: "Te vertalen tekst",
    textPlaceholder: "Voer tekst in om te vertalen of upload document hierboven...",
    professionalTranslations: "Professionele vertalingen",
    translate: "Vertalen",
    translating: "Vertalen...",
    translationResult: "Vertaalresultaat",
    translationInProgress: "Vertaling in uitvoering...",
    exportPDF: "Exporteer PDF",
    copyTranslation: "Kopieer vertaling",
    translationServices: "Vertaaldiensten",
    specializedTranslations: "Gespecialiseerde vertalingen:",
    technicalSupport: "Technische ondersteuning:"
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
    language: "Dil",
    
    // Services
    moneyTransfer: "Para Transferi",
    firstSteps: "Hollanda'da İlk Adımlar",
    
    // Legal Categories
    legalCategoriesTitle: "Kategori ve dil seçin",
    selectCategory: "Dava kategorisi *",
    selectCategoryPlaceholder: "Dava kategorisi seçin",
    selectLanguage: "Dil",
    selectLanguagePlaceholder: "Dil seçin",
    
    // Legal Form
    questionLabel: "Hukuki sorunuz * (max 2000 karakter)",
    questionPlaceholder: "Hukuki durumunuzu açıklayın veya soru sorun...",
    charactersCount: "karakter",
    disclaimerText: "Ön tavsiye - avukatın yerini tutmaz",
    startConversationBtn: "Konuşmaya başla",
    
    // First Steps Holland
    firstStepsTitle: "Hollanda'da İlk Adımlar",
    firstStepsDescription: "İlk aylarda ihtiyacınız olan tüm temel hizmetleri bulun",
    serviceSearchTitle: "Hizmet Arama",
    category: "Kategori",
    selectCategoryGeneral: "Kategori seçin",
    region: "Bölge",
    allRegions: "Tüm bölgeler",
    searchLabel: "Arama",
    searchPlaceholder: "İsim veya hizmet...",
    categories: "Kategoriler",
    searchResults: "Arama Sonuçları",
    noResults: "Seçilen kriterlere göre sonuç bulunamadı",
    selectCategoryToSee: "Sonuçları görmek için kategori seçin",
    services: "hizmet",
    usefulTips: "Faydalı İpuçları",
    
    // Categories
    workOffices: "İş Büroları",
    insurance: "Sigorta",
    housing: "Konut",
    telecom: "Telekomünikasyon",
    banking: "Bankacılık",
    
    // Translator
    translatorTitle: "Dilleri seçin",
    sourceLanguage: "Kaynak dil",
    targetLanguage: "Hedef dil",
    autoDetect: "Otomatik algıla",
    selectTargetLanguage: "Hedef dil seçin",
    uploadDocuments: "Belge veya fotoğraf yükleyin",
    uploadDocument: "Belge yükle",
    takePhoto: "Fotoğraf çek",
    uploadedFiles: "Yüklenen dosyalar:",
    textToTranslate: "Çevrilecek metin",
    textPlaceholder: "Çevrilecek metni girin veya yukarıdan belge yükleyin...",
    professionalTranslations: "Profesyonel çeviriler",
    translate: "Çevir",
    translating: "Çeviriyor...",
    translationResult: "Çeviri sonucu",
    translationInProgress: "Çeviri devam ediyor...",
    exportPDF: "PDF'e aktar",
    copyTranslation: "Çeviriyi kopyala",
    translationServices: "Çeviri hizmetleri",
    specializedTranslations: "Uzman çeviriler:",
    technicalSupport: "Teknik destek:"
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