"use client";

import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';

const FAQAccordion = () => {
  // Select a subset of FAQs most relevant to contact inquiries
  const contactFaqs = [
    faqs[2], // Warranty period
    faqs[3], // Installation and training
    faqs[5], // Technical support in Arabic
    faqs[6], // Delivery to all governorates
    faqs[7], // Machine upgrade options
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">الأسئلة الشائعة</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {contactFaqs.map((faq, index) => faq ? (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-gray-200 last:border-none"
            >
              <AccordionTrigger className="text-right text-lg font-semibold text-gray-900 py-5 hover:no-underline hover:text-primary">
                {faq.questionAr}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base py-3 px-1">
                {faq.answerAr}
              </AccordionContent>
            </AccordionItem>
          ) : null)}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQAccordion; 