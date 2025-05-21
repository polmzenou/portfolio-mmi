// src/app/layout.tsx
import '../styles/globals.css';
import { Metadata } from 'next';
import { LayoutModeProvider } from '../lib/context/LayoutModeContext';
import EmailJSInitializer from '../lib/EmailJSInitializer';

export const metadata: Metadata = {
  title: 'Paul Mehr | Portfolio',
  description: 'Portfolio de développeur créatif inspiré du jeu Marathon',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#C0FE04',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-black antialiased">
        <LayoutModeProvider>
          <EmailJSInitializer />
          {children}
        </LayoutModeProvider>
      </body>
    </html>
  );
}
