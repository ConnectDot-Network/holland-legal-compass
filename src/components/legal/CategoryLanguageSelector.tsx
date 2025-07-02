
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { legalCategories, languages, LegalCategory, Language } from "@/types/legal";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryLanguageSelectorProps {
  category: string;
  language: string;
  onCategoryChange: (category: string) => void;
  onLanguageChange: (language: string) => void;
}

export const CategoryLanguageSelector = ({ 
  category, 
  language, 
  onCategoryChange, 
  onLanguageChange 
}: CategoryLanguageSelectorProps) => {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span>{t("legalCategoriesTitle")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t("selectCategory")}</label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectCategoryPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {legalCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t("selectLanguage")}</label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectLanguagePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
