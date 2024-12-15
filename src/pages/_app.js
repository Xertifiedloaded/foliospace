import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

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
            <Component {...pageProps} />
          </AuthProvider>
        </div>
      </SessionProvider>
    </>
  );
}
