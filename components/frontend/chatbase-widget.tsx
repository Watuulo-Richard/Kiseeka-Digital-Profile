// components/chatbase-widget.tsx
'use client';

import Script from 'next/script';

const CHATBOT_ID = process.env.NEXT_PUBLIC_CHATBASE_ID;

export function ChatbaseWidget() {
  if (!CHATBOT_ID) return null;

  return (
    <>
      <Script id="chatbase-config" strategy="afterInteractive">
        {`
          window.embeddedChatbotConfig = {
            chatbotId: "${CHATBOT_ID}",
            domain: "www.chatbase.co"
          };
        `}
      </Script>
      <Script
        src="https://www.chatbase.co/embed.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}