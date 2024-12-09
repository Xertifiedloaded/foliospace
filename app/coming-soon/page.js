'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RocketIcon } from 'lucide-react';

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const targetDate = new Date('2024-12-31T00:00:00'); 
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft('We are live!');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-50 to-pink-100 p-4">
      <div className="text-center max-w-xl">
        <div className="mb-8 flex justify-center">
          <RocketIcon size={120} className="text-primary animate-pulse" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Something Amazing is Coming
        </h1>
        <p className="text-muted-foreground mb-6 text-lg">
          We're working hard to launch a game-changing platform. 
          Stay tuned for a revolutionary experience!
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="default">Notify Me</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
