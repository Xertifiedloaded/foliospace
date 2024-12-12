import "./global.css";
import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from '../../hooks/use-auth';





export default function MyApp({ Component, pageProps }) {
  const isMaintainance = false; 
  const isComingSoon = false; 

  return (
    <div className={` antialiased`}>
      <Toaster />
      <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
    </div>
  );
}
