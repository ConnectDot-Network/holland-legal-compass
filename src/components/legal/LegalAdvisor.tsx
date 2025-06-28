
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { sanitizeInput, isValidCategory, isValidLanguage } from "@/utils/security";
import { generateLegalAdvice } from "@/utils/legalAdviceGenerator";
import { ConversationMessage, FileAttachment, legalCategories, languages } from "@/types/legal";
import { SecurityNotice } from "./SecurityNotice";
import { CategoryLanguageSelector } from "./CategoryLanguageSelector";
import { ConversationArea } from "./ConversationArea";
import { QuestionForm } from "./QuestionForm";
import { FileUpload } from "./FileUpload";
import { LegalResources } from "./LegalResources";

// Hardcoded webhook URL - not visible to users
const WEBHOOK_URL = 'https://darekpolec.app.n8n.cloud/webhook-test/61602cd2-c01d-4c86-9986-72679b551520';

const LegalAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const sanitizedQuestion = sanitizeInput(question, 2000);
    if (!sanitizedQuestion.trim()) {
      toast({
        title: "Błąd",
        description: "Pytanie nie może być puste",
        variant: "destructive",
      });
      return;
    }

    if (!category || !isValidCategory(category, legalCategories)) {
      toast({
        title: "Błąd",
        description: "Wybierz prawidłową kategorię",
        variant: "destructive",
      });
      return;
    }

    const selectedLanguage = language || "Polski";
    if (!isValidLanguage(selectedLanguage, languages)) {
      toast({
        title: "Błąd",
        description: "Wybierz prawidłowy język",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setQuestion('');
    
    // Add user message to conversation
    const newMessage: ConversationMessage = { 
      type: 'user', 
      message: sanitizedQuestion, 
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    setConversation(prev => [...prev, newMessage]);
    
    // Clear attachments after sending
    setAttachments([]);

    try {
      // Send to n8n webhook
      const webhookData = {
        question: sanitizedQuestion,
        category: category,
        language: selectedLanguage,
        attachments: attachments.map(att => ({
          name: att.name,
          type: att.type,
          size: att.size
        })),
        timestamp: new Date().toISOString()
      };

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(webhookData),
      });

      toast({
        title: "Wysłano zapytanie",
        description: "Twoje pytanie i załączniki zostały przekazane do systemu prawniczego",
      });

      // Simulate AI response
      setTimeout(() => {
        const response = generateLegalAdvice(sanitizedQuestion, category, selectedLanguage);
        const responseMessage: ConversationMessage = {
          type: 'advisor',
          message: response,
          timestamp: new Date()
        };
        setConversation(prev => [...prev, responseMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Błąd wysyłania zapytania", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać zapytania",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setAttachments([]);
    toast({
      title: "Wyczyszczono",
      description: "Historia rozmowy została usunięta",
    });
  };

  return (
    <div className="space-y-6">
      <SecurityNotice />

      <CategoryLanguageSelector
        category={category}
        language={language}
        onCategoryChange={setCategory}
        onLanguageChange={setLanguage}
      />

      <FileUpload
        attachments={attachments}
        onAttachmentsChange={setAttachments}
      />

      <ConversationArea
        conversation={conversation}
        category={category}
        isLoading={isLoading}
        onClearConversation={clearConversation}
      />

      <QuestionForm
        question={question}
        category={category}
        isLoading={isLoading}
        webhookError=""
        onQuestionChange={setQuestion}
        onSubmit={handleSubmit}
      />

      <LegalResources />
    </div>
  );
};

export default LegalAdvisor;
