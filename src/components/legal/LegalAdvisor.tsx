
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { sanitizeInput, isValidCategory, isValidLanguage, checkRateLimit, logSecurityEvent } from "@/utils/security";
import { generateLegalAdvice } from "@/utils/legalAdviceGenerator";
import { ConversationMessage, FileAttachment, legalCategories, languages } from "@/types/legal";
import { SecurityNotice } from "./SecurityNotice";
import { CategoryLanguageSelector } from "./CategoryLanguageSelector";
import { ConversationArea } from "./ConversationArea";
import { QuestionForm } from "./QuestionForm";
import { FileUpload } from "./FileUpload";
import { LegalResources } from "./LegalResources";

// Webhook URL - should be moved to environment variables in production
const WEBHOOK_URL = 'https://darekpolec.app.n8n.cloud/webhook-test/Holland Legal Compass';

const LegalAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      attachments.forEach(attachment => {
        URL.revokeObjectURL(attachment.url);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('legal_questions', 5, 60000)) {
      toast({
        title: "Za dużo zapytań",
        description: "Możesz wysłać maksymalnie 5 pytań na minutę. Spróbuj ponownie za chwilę.",
        variant: "destructive",
      });
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { action: 'legal_question' });
      return;
    }
    
    // Validate inputs with enhanced sanitization
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
      logSecurityEvent('INVALID_CATEGORY', { category });
      return;
    }

    const selectedLanguage = language || "Polski";
    if (!isValidLanguage(selectedLanguage, languages)) {
      toast({
        title: "Błąd",
        description: "Wybierz prawidłowy język",
        variant: "destructive",
      });
      logSecurityEvent('INVALID_LANGUAGE', { language: selectedLanguage });
      return;
    }

    // Check attachment count
    if (attachments.length > 10) {
      toast({
        title: "Za dużo załączników",
        description: "Maksymalnie 10 plików na raz",
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
      // Prepare webhook data with security considerations
      const webhookData = {
        question: sanitizedQuestion,
        category: category,
        language: selectedLanguage,
        attachments: attachments.map(att => ({
          name: att.name,
          type: att.type,
          size: att.size
          // Note: URL is intentionally omitted for security
        })),
        timestamp: new Date().toISOString(),
        sessionId: Date.now().toString() // Simple session tracking
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(webhookData),
        // Remove no-cors mode for better security
        // Note: This requires proper CORS headers on the webhook endpoint
      });

      // Check response status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      toast({
        title: "Wysłano zapytanie",
        description: "Twoje pytanie i załączniki zostały przekazane do systemu prawniczego",
      });

      logSecurityEvent('WEBHOOK_REQUEST_SUCCESS', {
        category,
        language: selectedLanguage,
        attachmentCount: attachments.length
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
      
      logSecurityEvent('WEBHOOK_REQUEST_FAILED', {
        error: error instanceof Error ? error.message : 'Unknown error',
        category,
        language: selectedLanguage
      });
      
      toast({
        title: "Błąd połączenia",
        description: "Nie udało się wysłać zapytania. Sprawdź połączenie internetowe.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    // Clean up object URLs before clearing
    conversation.forEach(msg => {
      msg.attachments?.forEach(att => {
        URL.revokeObjectURL(att.url);
      });
    });
    
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
