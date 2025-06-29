
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Globe, Sun, Moon, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
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

  return (
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
  );
};

export default Header;
