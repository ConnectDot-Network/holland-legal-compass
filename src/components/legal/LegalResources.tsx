
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const LegalResources = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-green-600" />
          <span>Przydatne zasoby</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Oficjalne strony:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Rijksoverheid.nl - informacje rządowe</li>
              <li>• Rechtspraak.nl - orzecznictwo</li>
              <li>• IND.nl - sprawy imigracyjne</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Numery alarmowe:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Rechtsbijstand: 0900-8020</li>
              <li>• Juridisch Loket: 0900-8020</li>
              <li>• Konsulat Polski: +31 70 360 2806</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
