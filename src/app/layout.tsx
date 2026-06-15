import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nvisioninsights.it"),

  title: {
    default: "NVision Insights",
    template: "%s | NVision Insights",
  },

  description:
    "Tecnologia, divulgazione e innovazione per la nuova generazione digitale.",

  alternates: {
    canonical: "https://www.nvisioninsights.it",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "NVision Insights",
    description: "Tecnologia, divulgazione e innovazione.",
    url: "https://www.nvisioninsights.it",
    siteName: "NVision Insights",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      }
    ],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
