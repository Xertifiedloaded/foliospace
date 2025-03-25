import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "../../hooks/use-auth";
import useDarkMode from "../../components/provider/ThemeContext";
import Header from "@/components/Header";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useDarkMode();
  return (
    <>
      <SessionProvider session={session}>
          <div className={`antialiased`}>
            <Toaster />
            <AuthProvider>
              <Header />
              <GoogleAnalytics gaId={process.env.GoogleAnalytics} />
              <Component {...pageProps} />
              <Analytics />
            </AuthProvider>
          </div>
        </SessionProvider>
    </>
  );
}

export default MyApp;
