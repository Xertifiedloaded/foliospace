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
    <section className="w-full wrapper max-w-5xl my-5 mx-auto py-12  transition-colors duration-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-heading">
          Frequently Asked Questions
        </h2>
        <p className="text-paragraph">
          Everything you need to know about creating your portfolio with Foliospace
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-b border-border "
          >
            <AccordionTrigger className="text-left text-heading">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-paragraph">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

