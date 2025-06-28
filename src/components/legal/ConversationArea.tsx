
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, FileText, Trash2 } from "lucide-react";
import { ConversationMessage } from "@/types/legal";
import { printConversation } from "@/utils/conversationPrinter";

interface ConversationAreaProps {
  conversation: ConversationMessage[];
  category: string;
  isLoading: boolean;
  onClearConversation: () => void;
}

export const ConversationArea = ({ 
  conversation, 
  category, 
  isLoading, 
  onClearConversation 
}: ConversationAreaProps) => {
  const handlePrintConversation = () => {
    printConversation(conversation, category);
  };

  return (
    <Card className="min-h-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Rozmowa z doradcą prawnym</CardTitle>
          {conversation.length > 0 && (
            <div className="flex space-x-2">
              <Button
                onClick={handlePrintConversation}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <FileText className="w-4 h-4" />
                <span>Drukuj</span>
              </Button>
              <Button
                onClick={onClearConversation}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span>Wyczyść</span>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {conversation.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Scale className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Zadaj swoje pytanie prawne, aby rozpocząć konsultację</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.message}</div>
                  <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleString('pl-PL')}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <span>Doradca analizuje Twoją sprawę...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
