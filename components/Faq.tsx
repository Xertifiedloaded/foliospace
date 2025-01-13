import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/utils/data";

export function FAQ() {
  return (
    <section className="w-full max-w-5xl my-5 mx-auto py-12 px-4 bg-white dark:bg-black transition-colors duration-200">
      <div className="text-center mb-10">
        <h2 className="lg:text-4xl text-2xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground dark:text-gray-400">
          Everything you need to know about creating your portfolio with Foliospace
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground dark:text-gray-400">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

