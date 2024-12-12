"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  RiPlayFill, 
  RiBookmarkLine, 
  RiArrowRightLine, 
  RiFullscreenLine 
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const ProfessionalBrandSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.3 
  });

  const handleVideoPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error("Video play failed:", error);
      });
      setIsVideoPlaying(true);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 grid  lg:grid-cols-2 gap-12 items-center">

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        <div 
          className="relative overflow-hidden rounded-2xl shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {inView && (
            <video
              ref={videoRef}
              src="/video/record.mov"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              preload="auto"
              muted
              playsInline
            />
          )}

          <div 
            className={`absolute inset-0 bg-black/30 flex items-center justify-center 
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex space-x-4">
              {!isVideoPlaying && (
                <button 
                  onClick={handleVideoPlay}
                  className="bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/40 transition"
                >
                  <RiPlayFill className="w-8 h-8 text-white" />
                </button>
              )}
              <button 
                onClick={handleFullscreen}
                className="bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/40 transition"
              >
                <RiFullscreenLine className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Elevate Your Digital Narrative
          </h2>

          <div className="space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              In the digital era, your online presence is your professional 
              passport. Creatify transforms your career journey into a 
              compelling, dynamic digital showcase that resonates with 
              opportunities and personal branding.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              More than a portfolio, Creatify is your strategic platform to 
              amplify your professional story, celebrate achievements, and 
              unlock new career horizons.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            className="group flex items-center justify-center space-x-2"
          >
            <RiPlayFill className="w-5 h-5 group-hover:rotate-[360deg] transition" />
            <span>Get Started</span>
            <RiArrowRightLine className="ml-2 opacity-0 group-hover:opacity-100 transition" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="group flex items-center justify-center space-x-2"
          >
            <RiBookmarkLine className="w-5 h-5 group-hover:scale-110 transition" />
            <span>Learn More</span>
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              Trusted by professionals across industries
            </p>
            <div className="flex justify-center -space-x-3">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <img
                  key={index}
                  src="/images/user.jpg"
                  alt={`User ${index + 1}`}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProfessionalBrandSection;