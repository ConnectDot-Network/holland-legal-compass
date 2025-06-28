
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export const SecurityNotice = () => {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
          <Shield className="w-5 h-5" />
          <div>
            <p className="font-medium">Bezpieczeństwo i Prywatność</p>
            <p className="text-sm">Twoje dane są przetwarzane lokalnie. Webhook URL musi być bezpieczny (HTTPS).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
