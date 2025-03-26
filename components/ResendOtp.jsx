"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "../hooks/use-toast";

export default function OTPResend() {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendClick = () => {
    setIsModalOpen(true);
  };

  const handleSendOTP = async () => {
    // Validate email
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/resendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "OTP resend Successful !",
          description: "OTP has been resent to your email",
        });
        setIsModalOpen(false);
        setCountdown(60);
        setCanResend(false);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to Resend Otp",
          description: data.message || "Failed to resend OTP",
        });
      }
    } catch (error) {
      console.error("OTP Resend Error:", error);
      toast({
        variant: "destructive",
        title: "Failed to Resend Otp",
        description: "Failed to resend OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="justify-center text-center">
        <p className="text-sm ">
          Didn't receive the code?{" "}
          <Button
            variant="link"
            className="p-0 text-sm"
            onClick={handleResendClick}
            disabled={!canResend}
          >
            {canResend ? "Resend OTP" : `Resend in ${formatTime(countdown)}`}
          </Button>
        </p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resend OTP</DialogTitle>
            <DialogDescription>
              Enter your email to receive a new OTP
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendOTP} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
