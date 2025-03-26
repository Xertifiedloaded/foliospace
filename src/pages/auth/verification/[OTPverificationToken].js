import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from '@/hooks/use-toast';

export default function TokenVerificationPage() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push("/auth/auth/login");
        } else {
          toast({
            variant: "destructive",
            title: "Verification Failed",
            description: data.message,
          });
          router.push("/auth/login");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
        router.push("/auth/login");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center text-gray-600 dark:text-gray-300">
        Verifying your email...
      </div>
    </div>
  );
}