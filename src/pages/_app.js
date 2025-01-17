import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "../../hooks/use-auth";
import { appWithTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { ThemeProvider } from "../../components/provider/ThemeContext";

const ComingSoon = dynamic(() => import("../../components/ComingSoon"), {
  ssr: false,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const production = process.env.NODE_ENV === "development";

  return (
    <>
      <ThemeProvider
       attribute="class"
       defaultTheme="system"
       enableSystem
       disableTransitionOnChange>
        {production ? (
          <ComingSoon />
        ) : (
          <SessionProvider session={session}>
            <div className={`antialiased`}>
              <Toaster />
              <AuthProvider>
                <GoogleAnalytics gaId={process.env.GoogleAnalytics} />
                <Component {...pageProps} />
                <Analytics />
              </AuthProvider>
            </div>
          </SessionProvider>
        )}
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
