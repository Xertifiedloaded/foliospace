import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { AuthProvider } from "../../hooks/use-auth";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
    
      <SessionProvider session={session}>
        <div className={` antialiased`}>
          <Toaster />
          <AuthProvider>
            <GoogleAnalytics gaId="G-4NR3CMEKVW"/>
            <Component {...pageProps} />
            <Analytics />
          </AuthProvider>
        </div>
      </SessionProvider>
    </>
  );
}
