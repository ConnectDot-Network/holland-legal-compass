
import { ConversationMessage } from "@/types/legal";

export const printConversation = (conversation: ConversationMessage[], category: string) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <html>
      <head>
        <title>Rozmowa z Doradcą Prawnym - Holland Legal Compass</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #ccc; padding-bottom: 20px; }
          .message { margin: 15px 0; padding: 10px; border-radius: 8px; }
          .user { background-color: #e3f2fd; margin-left: 20%; }
          .advisor { background-color: #f5f5f5; margin-right: 20%; }
          .timestamp { font-size: 0.8em; color: #666; margin-top: 5px; }
          .category { font-weight: bold; color: #1976d2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Holland Legal Compass</h1>
          <h2>Rozmowa z Doradcą Prawnym</h2>
          <p class="category">Kategoria: ${category}</p>
          <p>Data wydruku: ${new Date().toLocaleString('pl-PL')}</p>
        </div>
        ${conversation.map(msg => `
          <div class="message ${msg.type}">
            <strong>${msg.type === 'user' ? 'Ty' : 'Doradca Prawny'}:</strong>
            <div>${msg.message.replace(/\n/g, '<br>')}</div>
            <div class="timestamp">${msg.timestamp.toLocaleString('pl-PL')}</div>
          </div>
        `).join('')}
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};
