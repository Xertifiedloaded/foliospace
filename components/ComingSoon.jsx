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
import { useToast } from "../hooks/use-toast";


const ComingSoon = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is required.",
      });
      return;
    }

    setLoading(true);

    try {
      const success = await submitEmail(email);
      if (success) {
        setEmail("");
        toast({
          title: "Success!",
          description: "Thanks for joining our waitlist! We'll notify you when we launch.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full bg-white/10 dark:bg-black/10 backdrop-blur-lg border-0">
        <CardHeader className="space-y-6 text-center">
          <CardTitle className="text-2xl md:text-6xl font-extrabold text-white dark:text-white tracking-tight">
            Welcome to Foliospace
          </CardTitle>
          <CardDescription className="text-sm md:text-2xl text-white/90 dark:text-white/80">
            Your all-in-one portfolio platform for creative professionals.
            Showcase your work, connect with clients, and grow your career.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center mt-8"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
              required
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-white dark:bg-gray-950 text-purple-600 dark:text-purple-400 hover:bg-white/90 dark:hover:bg-gray-900"
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
          </form>

          <div className="flex justify-center space-x-6 mt-8">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white dark:text-white/80 dark:hover:text-white">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white dark:text-white/80 dark:hover:text-white">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white dark:text-white/80 dark:hover:text-white">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;