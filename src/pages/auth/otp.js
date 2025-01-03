import React, { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '../../../components/AuthLayout';

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.nextSibling && e.target.value) e.target.nextSibling.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp-received", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpCode }),
      });

      if (!res.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      toast({
        title: "Success!",
        description: "OTP verified successfully. Redirecting to login...",
        className: "bg-green-50",
      });

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
<AuthLayout>
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Enter Verification Code
            </h2>
            <p className="text-gray-500 mt-2">
              Please enter the 4-digit code sent to your email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-16 text-base h-16 text-center font-semibold border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
</AuthLayout>
  );
};

export default OtpPage;