
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

export const SecurityNotice = () => {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
            <Shield className="w-5 h-5" />
            <div>
              <p className="font-medium">Bezpieczeństwo i Prywatność</p>
              <p className="text-sm">Twoje dane są chronione zaawansowanymi środkami bezpieczeństwa.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-700">Szyfrowanie danych</p>
                <p className="text-blue-600">Wszystkie dane są przesyłane przez bezpieczne połączenie HTTPS</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <FileCheck className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-700">Walidacja plików</p>
                <p className="text-blue-600">Załączniki są sprawdzane pod kątem bezpieczeństwa</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Eye className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-700">Ochrona prywatności</p>
                <p className="text-blue-600">Ograniczenie częstotliwości zapytań</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
