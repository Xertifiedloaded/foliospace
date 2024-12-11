import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../hooks/use-auth";
import MaintenancePage from "./maintenance/page";
import ComingSoonPage from './coming-soon/page';
import { Toaster } from "@/components/ui/toaster";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Creatify - Showcase Your Digital Brand",
  description:
    "Creatify is the ultimate platform for building and showcasing your personal and professional brand with ease. Create a digital ecosystem that tells your unique story.",
  openGraph: {
    title: "Creatify - Showcase Your Digital Brand",
    description:
      "Creatify is the all-in-one solution to create and share your professional narrative with the world. A dynamic platform that highlights your achievements and opens doors to opportunities.",
    url: "https://creatify.com",
    siteName: "Creatify",
    images: [
      {
        url: "https://creatify.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creatify - Showcase Your Digital Brand",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintainance = false; 
  const isComingSoon = false; 

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster/>
        {isMaintainance ? (
          <MaintenancePage />
        ) : isComingSoon ? (
          <ComingSoonPage />
        ) : (
          <AuthProvider>{children}</AuthProvider>
        )}
      </body>
    </html>
  );
}
