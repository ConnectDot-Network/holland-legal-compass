
export interface ConversationMessage {
  type: 'user' | 'advisor';
  message: string;
  timestamp: Date;
}

export const legalCategories = [
  "Prawo pracy",
  "Umowy B2B/B2C",
  "Prawo podatkowe", 
  "Spółki i start-upy",
  "Nieruchomości",
  "Prawo rodzinne",
  "Spadki",
  "Prawo konsumenckie",
  "RODO / dane osobowe",
  "Mandaty i wykroczenia"
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
