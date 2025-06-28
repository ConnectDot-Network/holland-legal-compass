
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Trash2, Printer, User, Bot, File, Image } from "lucide-react";
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
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pl-PL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="w-3 h-3" />;
    }
    return <File className="w-3 h-3" />;
  };

  if (conversation.length === 0 && !isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Gotowy do pomocy prawnej
          </h3>
          <p className="text-gray-500">
            {category 
              ? `Wybrano kategorię: ${category}. Zadaj pytanie aby rozpocząć rozmowę.`
              : "Wybierz kategorię sprawy i zadaj pytanie aby rozpocząć rozmowę."
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Rozmowa prawna</span>
            {category && (
              <Badge variant="outline" className="text-blue-700 border-blue-700">
                {category}
              </Badge>
            )}
          </CardTitle>
          {conversation.length > 0 && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => printConversation(conversation, category)}
              >
                <Printer className="w-4 h-4 mr-2" />
                Drukuj
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearConversation}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Wyczyść
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-4 pr-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {message.type === 'user' ? 'Ty' : 'Doradca Prawny'}
                    </span>
                    <span className="text-xs opacity-75">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  
                  {/* Display attachments if any */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs opacity-75">Załączniki:</p>
                      {message.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center space-x-1 text-xs">
                          {getFileIcon(attachment.type)}
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <span className="text-sm font-medium">Doradca Prawny</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="text-xs text-gray-500 ml-2">Analizuję sprawę...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
