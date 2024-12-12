import "./global.css";
import { Toaster } from "@/components/ui/toaster";

import ComingSoonPage from "./coming-soon";
import { AuthProvider } from '../../hooks/use-auth';
import MaintenancePage from "./maintenance";




export default function MyApp({ Component, pageProps }) {
  const isMaintainance = false; 
  const isComingSoon = false; 

  return (
    <div className={` antialiased`}>
      <Toaster />
      {isMaintainance ? (
        <MaintenancePage />
      ) : isComingSoon ? (
        <ComingSoonPage />
      ) : (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      )}
    </div>
  );
}
