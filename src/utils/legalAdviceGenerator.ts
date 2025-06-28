
export const generateLegalAdvice = (question: string, category: string, language: string): string => {
  return `Jako doradca prawny specjalizujący się w prawie holenderskim, w kategorii "${category}", analizuję Twoją sytuację w języku ${language}:

${question}

Na podstawie aktualnego prawa holenderskiego, oto moja analiza:

1. **Kluczowe przepisy**: W Holandii obowiązują szczegółowe regulacje dotyczące tej kwestii...

2. **Twoje prawa**: Zgodnie z holenderskim prawem, masz następujące uprawnienia...

3. **Zalecane działania**: 
   - Zbierz niezbędną dokumentację
   - Rozważ konsultację z lokalnym prawnikiem
   - Sprawdź terminy prawne

4. **Ostrzeżenia**: Zwróć uwagę na potencjalne pułapki prawne...

**Uwaga**: To jest wstępna analiza. W skomplikowanych sprawach zalecam konsultację z certyfikowanym prawnikiem holenderskim.`;
};
