import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vatika Naturals – GO IN 20 | 20 Minutes. Zero Pause.",
  description:
    "Your life never slows down. Neither should your hair. Join the GO IN 20 challenge by Vatika Naturals — 20 minutes of nourishment, zero pause, amazing rewards.",
  keywords: [
    "Vatika",
    "Vatika Naturals",
    "GO IN 20",
    "hair care",
    "campaign",
    "Bangladesh",
    "hair oil",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

import { ClientLayout } from "@/components/layout/ClientLayout";
