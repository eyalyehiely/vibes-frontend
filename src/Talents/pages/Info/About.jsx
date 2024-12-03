import React from 'react';
import { CheckCircle } from 'lucide-react';

export function About() {
  const benefits = [
    "ממשק משתמש אינטואיטיבי וקל לשימוש",
    "תמיכה טכנית 24/7",
    "עדכונים שוטפים ושיפורים מתמידים",
    "אינטגרציה עם כלים מובילים בשוק"
  ];

  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              אודות הפלטפורמה שלנו
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              אנחנו מספקים פתרון מקיף לניהול העסק שלך, עם דגש על חווית משתמש מעולה ויכולות מתקדמות שיעזרו לך להצליח.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-success" size={24} />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop"
              alt="team collaboration"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="text-4xl font-bold text-primary mb-2">+85%</div>
              <p className="text-gray-600">שיפור בפרודוקטיביות</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}