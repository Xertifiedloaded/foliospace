// ComingSoon.jsx
import React from "react";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { submitEmail } from "../hooks/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ConstructionScene = () => (
  <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-hidden">
    {/* Building Frame */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <svg width="200" height="150" viewBox="0 0 200 150" className="animate-building">
        <rect x="40" y="30" width="120" height="120" fill="none" stroke="currentColor" 
              className="text-gray-400 dark:text-gray-600 animate-construct" strokeWidth="4"/>
        <rect x="60" y="50" width="20" height="20" className="text-gray-300 dark:text-gray-700 animate-windows" fill="currentColor"/>
        <rect x="120" y="50" width="20" height="20" className="text-gray-300 dark:text-gray-700 animate-windows" fill="currentColor"/>
        <rect x="60" y="90" width="20" height="20" className="text-gray-300 dark:text-gray-700 animate-windows" fill="currentColor"/>
        <rect x="120" y="90" width="20" height="20" className="text-gray-300 dark:text-gray-700 animate-windows" fill="currentColor"/>
      </svg>
    </div>

    {/* Crane */}
    <div className="absolute bottom-0 right-0 transform -translate-x-20">
      <svg width="100" height="200" viewBox="0 0 100 200" className="animate-crane">
        <line x1="50" y1="0" x2="50" y2="150" stroke="currentColor" className="text-yellow-500 dark:text-yellow-600" strokeWidth="4"/>
        <line x1="50" y1="20" x2="90" y2="20" stroke="currentColor" className="text-yellow-500 dark:text-yellow-600" strokeWidth="4"/>
        <circle cx="90" cy="20" r="4" className="text-yellow-500 dark:text-yellow-600 animate-pulley" fill="currentColor"/>
        <line x1="90" y1="20" x2="90" y2="60" stroke="currentColor" strokeDasharray="4" className="text-yellow-500 dark:text-yellow-600 animate-cable" strokeWidth="2"/>
        <rect x="85" y="60" width="10" height="10" className="text-gray-400 dark:text-gray-600 animate-load" fill="currentColor"/>
      </svg>
    </div>

    {/* Worker */}
    <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
      <svg width="50" height="50" viewBox="0 0 50 50" className="animate-worker">
        <circle cx="25" cy="15" r="8" className="text-blue-500 dark:text-blue-600" fill="currentColor"/>
        <line x1="25" y1="23" x2="25" y2="40" stroke="currentColor" className="text-blue-500 dark:text-blue-600" strokeWidth="4"/>
        <line x1="15" y1="30" x2="35" y2="30" stroke="currentColor" className="text-blue-500 dark:text-blue-600" strokeWidth="4"/>
        <line x1="25" y1="40" x2="15" y2="50" stroke="currentColor" className="text-blue-500 dark:text-blue-600" strokeWidth="4"/>
        <line x1="25" y1="40" x2="35" y2="50" stroke="currentColor" className="text-blue-500 dark:text-blue-600" strokeWidth="4"/>
      </svg>
    </div>
  </div>
);

const ComingSoon = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const success = await submitEmail(email);
      if (success) {
        setEmail("");
        setStatus({
          type: "success",
          message: "Thanks for joining our waitlist! We'll notify you when we launch.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 relative">
      <ConstructionScene />
      
      <Card className="max-w-3xl w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-xl relative z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-pro"></div>
        </div>

        <CardHeader className="space-y-6 text-center">
          <div className="inline-block animate-bounce">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
              Under Construction
            </span>
          </div>
          <CardTitle className="text-2xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Welcome to Foliospace
          </CardTitle>
          <CardDescription className="text-xs md:text-lg text-gray-600 dark:text-gray-300">
            Your all-in-one portfolio platform for creative professionals.
            Showcase your work, connect with clients, and grow your career.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Join Waitlist
                  </>
                )}
              </Button>
            </div>

            {status.message && (
              <div 
                className={`text-center text-xs p-3 rounded-lg animate-fade ${
                  status.type === "error" 
                    ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                }`}
              >
                {status.message}
              </div>
            )}
          </form>

          <div className="flex justify-center space-x-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;