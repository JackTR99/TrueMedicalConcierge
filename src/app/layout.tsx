import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import "./globals.css";

const carlito = Carlito({
  variable: "--font-carlito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "True Medical Concierge",
    template: "%s · True Medical Concierge",
  },
  description:
    "A discreet and complete medical concierge service in Türkiye.",
  metadataBase: new URL("https://truemedicalconcierge.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${carlito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
