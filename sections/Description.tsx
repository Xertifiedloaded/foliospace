"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Maximize2, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const BrandSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [autoplayError, setAutoplayError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const handleVideoFocus = () => {
    if (videoRef.current) {
      try {
        if (!document.fullscreenElement) {
          videoRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.autoplay = true;
      videoElement.playsInline = true;

      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video is playing.");
          })
          .catch((error) => {
            console.error("Autoplay prevented:", error);
            setAutoplayError(true);

            // Retry playback on user interaction
            videoElement.addEventListener("click", () => {
              videoElement.play().catch((err) => console.error("Play failed:", err));
            });
          });
      }
    }
  }, []);

  return (
    <section
      className="grid md:grid-cols-2 items-center gap-12 
      wrapper px-6 lg:px-12 py-16"
    >
      <div className="w-full relative group" ref={ref}>
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl 
          transition-all duration-300 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {inView && (
            <video
              ref={videoRef}
              src="/video/record.mov"
              className="w-full h-auto object-cover rounded-2xl 
              transform transition-transform duration-300 
              group-hover:scale-[1.02]"
              preload="auto"
            />
          )}

          {autoplayError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <button
                onClick={() => videoRef.current?.play()}
                className="bg-white text-black px-4 py-2 rounded-md"
              >
                Click to Play
              </button>
            </div>
          )}

          <div
            className={`absolute inset-0 flex items-center justify-center 
            transition-opacity duration-300 
            ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <button
              onClick={handleVideoFocus}
              className="bg-white/20 backdrop-blur-md p-4 rounded-full 
              hover:bg-white/40 transition-all cursor-pointer 
              flex items-center justify-center"
            >
              <Maximize2 className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2
            className="text-4xl font-bold text-gray-900 
            tracking-tight leading-tight"
          >
            Transform Your Digital Presence
          </h2>

          <div className="space-y-4 ">
            <p className="text-gray-600  text-lg leading-relaxed">
              In today's digital world, your online presence goes beyond just a
              profile – it's a reflection of your professional journey. Creatify
              effortlessly merges every aspect of your personal and career brand
              into a powerful, all-encompassing showcase.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Creatify is more than just a portfolio – it's a powerful digital
              platform that showcases your story, celebrates your milestones,
              and opens up new pathways to success and recognition.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 pt-6">
          <button
            className="group relative overflow-hidden px-8 py-5 
        bg-blue-600 text-white rounded-xl 
        flex items-center justify-center gap-3
        shadow-[0_10px_25px_-10px_rgba(59,130,246,0.4)]
        hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.5)]
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Play className="w-5 h-5 transition-transform group-hover:rotate-[360deg]" />
            Get Started
            <div
              className="absolute inset-0 bg-blue-700 opacity-0 
          group-hover:opacity-10 transition-opacity duration-300"
            />
            <ArrowRight
              className="w-5 h-5 opacity-0 group-hover:opacity-100 
          absolute right-4 transition-all duration-300 
          group-hover:translate-x-1"
            />
          </button>

          <button
            className="group relative px-8 py-4 
        border-2 border-gray-300 text-gray-700 
        rounded-xl flex items-center justify-center gap-3
        hover:border-blue-500 hover:text-blue-600
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-1
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
            Learn More
            <div
              className="absolute inset-0 bg-gray-100 opacity-0 
          group-hover:opacity-50 transition-opacity duration-300"
            />
          </button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="lg:flex items-center space-x-4">
            <div className="text-sm lg:text-start text-center text-gray-500">
              Trusted by professionals across industries
            </div>
            <div className="flex mt-3 lg:mt-0 lg:justify-end justify-center gap-2 -space-x-2">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <img
                  key={index}
                  src={`/images/user.jpg`}
                  alt={`User ${index + 1}`}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;