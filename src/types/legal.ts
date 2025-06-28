
export interface ConversationMessage {
  type: 'user' | 'advisor';
  message: string;
  timestamp: Date;
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export const legalCategories = [
  "Mandaty i wykroczenia",
  "Sprawy karne", 
  "Wypadki w pracy i prywatnie",
  "Nieruchomości",
  "Prawo pracy",
  "Umowy B2B/B2C", 
  "Prawo podatkowe",
  "Spółki i start-upy",
  "Prawo rodzinne",
  "Spadki",
  "Prawo konsumenckie",
  "RODO / dane osobowe"
] as const;

export const languages = [
  "Polski",
  "Turecki", 
  "Bułgarski",
  "Angielski",
  "Hiszpański",
  "Rumuński",
  "Holenderski",
  "Węgierski",
  "Litewski",
  "Ukraiński",
  "Francuski",
  "Włoski"
] as const;

export type LegalCategory = typeof legalCategories[number];
export type Language = typeof languages[number];
