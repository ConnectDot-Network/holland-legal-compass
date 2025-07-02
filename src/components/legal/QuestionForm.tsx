
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionFormProps {
  question: string;
  category: string;
  isLoading: boolean;
  webhookError: string;
  onQuestionChange: (question: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuestionForm = ({ 
  question, 
  category, 
  isLoading, 
  onQuestionChange, 
  onSubmit 
}: QuestionFormProps) => {
  const { t } = useLanguage();
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("questionLabel")}</label>
            <Textarea
              placeholder={t("questionPlaceholder")}
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={2000}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{question.length}/2000 {t("charactersCount")}</p>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-orange-700 border-orange-700">
              <AlertCircle className="w-3 h-3 mr-1" />
              {t("disclaimerText")}
            </Badge>
            <Button 
              type="submit" 
              disabled={!question.trim() || !category || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {t("startConversationBtn")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
