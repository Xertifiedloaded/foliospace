"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Foliospace</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your ultimate platform to showcase your work, build your online presence, and connect with opportunities.
          </p>
        </motion.div>


        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
            At Foliospace, we believe that every creative and professional deserves a space to highlight their skills 
            and achievements. Our mission is to empower individuals by providing an intuitive platform for portfolio 
            creation, networking, and career growth.
          </p>
        </section>


        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Foliospace?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl shadow-lg bg-card"
            >
              <h3 className="text-xl font-semibold mb-2">Seamless Portfolio Creation</h3>
              <p className="text-muted-foreground">
                Easily showcase your work with a modern and professional portfolio.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl shadow-lg bg-card"
            >
              <h3 className="text-xl font-semibold mb-2">Networking & Exposure</h3>
              <p className="text-muted-foreground">
                Connect with industry leaders and gain visibility in your field.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-xl shadow-lg bg-card"
            >
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-muted-foreground">
                Unlock job opportunities and collaborations with top companies.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
