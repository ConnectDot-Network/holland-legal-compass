
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Scale, AlertCircle } from "lucide-react";

interface WebhookConfigProps {
  webhookUrl: string;
  webhookError: string;
  onWebhookUrlChange: (url: string) => void;
}

export const WebhookConfig = ({ webhookUrl, webhookError, onWebhookUrlChange }: WebhookConfigProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <span>Konfiguracja doradcy prawnego</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Webhook URL (n8n) - tylko HTTPS</label>
          <Input
            placeholder="https://twój-webhook.n8n.cloud/webhook/..."
            value={webhookUrl}
            onChange={(e) => onWebhookUrlChange(e.target.value)}
            className={webhookError ? "border-red-500" : ""}
          />
          {webhookError && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {webhookError}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
