import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bondhon | Premium Matrimony & Verified AI Matchmaking',
  description: 'Discover your perfect life partner with Bondhon. Built with bank-grade verifications, smart AI compatibility matching, and robust privacy controls.',
  openGraph: {
    title: 'Bondhon | Premium Matrimony & Verified AI Matchmaking',
    description: 'Discover your perfect life partner with Bondhon. Built with bank-grade verifications, smart AI compatibility matching, and robust privacy controls.',
    url: 'https://bondhon.example.com',
    siteName: 'Bondhon Matrimony',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans`}>
      <head>
        <link rel="canonical" href="https://bondhon.example.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bondhon Matrimony",
              "url": "https://bondhon.example.com",
              "description": "Premium matrimonial platform with verified profiles and smart matching algorithms.",
            }),
          }}
        />
      </head>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
