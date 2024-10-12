"use client"

import React, { useState } from 'react';

function FrequentlyAskedQuestion() {
    // state to check which question is clicked
    const [openQuestion, setOpenQuestion] = useState(null);

        // closing and opening of selected question
    const toggleQuestion = (index:any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // questions and answers
  const questions = [
    {
      question: "What is the event's refund policy?",
      answer: "All tickets are non-refundable unless the event is canceled or rescheduled. For more information, please check our ticket policy."
    },
    {
      question: "Are there any age restrictions for the event?",
      answer: "Yes, certain events may have age restrictions. Please verify your age during the registration process and present a valid ID upon entry."
    },
    {
      question: "What are the health and safety measures in place?",
      answer: "We follow all health and safety guidelines, including mask mandates and physical distancing when required. Sanitization stations will be available at the venue."
    },
    {
      question: "Can I bring outside food or beverages?",
      answer: "No, outside food and beverages are not allowed at the event. There will be food and drinks available for purchase inside the venue."
    },
  ];

  return (
    <div className=" p-4">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left font-medium text-lg bg-gray-200 p-3 rounded hover:bg-gray-300"
            >
              {question.question}
            </button>
            {openQuestion === index && (
              <div className="mt-2 p-3 bg-white border rounded">
                {question.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FrequentlyAskedQuestion;
