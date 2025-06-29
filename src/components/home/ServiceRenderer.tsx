
import React from 'react';
import LegalAdvisor from "@/components/legal/LegalAdvisor";
import TranslatorAssistant from "@/components/TranslatorAssistant";
import Receptionist from "@/components/Receptionist";
import BusinessAdvisor from "@/components/BusinessAdvisor";
import MoneyTransfer from "@/components/MoneyTransfer";
import FirstStepsHolland from "@/components/FirstStepsHolland";

interface ServiceRendererProps {
  activeService: string;
}

const ServiceRenderer = ({ activeService }: ServiceRendererProps) => {
  switch (activeService) {
    case "legal":
      return <LegalAdvisor />;
    case "translator":
      return <TranslatorAssistant />;
    case "receptionist":
      return <Receptionist />;
    case "business":
      return <BusinessAdvisor />;
    case "money-transfer":
      return <MoneyTransfer />;
    case "first-steps":
      return <FirstStepsHolland />;
    default:
      return null;
  }
};

export default ServiceRenderer;
