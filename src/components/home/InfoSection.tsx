
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const InfoSection = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default InfoSection;
