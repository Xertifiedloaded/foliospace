import React, { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "../../../components/AuthLayout";

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { resetToken } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match.",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, resetToken: resetToken }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.message || "Failed to reset password. Please try again."
        );
      }

      toast({
        title: "Success!",
        description:
          "Password has been reset successfully. Redirecting to login...",
        className: "bg-green-50",
      });

      setTimeout(() => {
        router.push("/auth/login");
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
      <section className="flex items-center justify-center min-h-screen  p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-500 mt-2">
              Create a new password to secure your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="new-password"
                className="block dark:text-black text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full dark:text-black border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium dark:text-black text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full border dark:text-black border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default PasswordResetPage;
