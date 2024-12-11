import React, { useState } from "react";
import DefaultLayout from "../Talents/components/DefaultLayout";


function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "מהי מטרת האתר הזה?",
      answer: "האתר נועד לספק מידע ושירותים למשתמשים בצורה קלה ונגישה.",
    },
    {
      question: "איך אפשר ליצור קשר עם שירות הלקוחות?",
      answer: "ניתן ליצור קשר עם שירות הלקוחות באמצעות טופס יצירת קשר או בטלפון שמופיע בעמוד 'צור קשר'.",
    },
    {
      question: "האם ניתן למחוק חשבון משתמש?",
      answer: "כן, ניתן למחוק חשבון משתמש דרך עמוד ההגדרות תחת האפשרות 'ניהול חשבון'.",
    },
    {
      question: "מהם תנאי השימוש באתר?",
      answer: "תנאי השימוש מפורטים בעמוד 'תנאי שימוש'. אנו ממליצים לקרוא אותם בעיון.",
    },
    {
      question: "כיצד ניתן לעדכן את פרטי החשבון שלי?",
      answer: "עדכון פרטי החשבון מתבצע דרך עמוד ההגדרות תחת 'עריכת פרטים אישיים'.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <DefaultLayout>
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        שאלות נפוצות
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-md p-4"
          >
            <button
              className="flex justify-between w-full text-right text-lg font-medium text-gray-800 focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </DefaultLayout>
  );
}

export default Faqs;