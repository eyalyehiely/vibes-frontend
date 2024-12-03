import React from 'react';
import { BarChart2, Shield, Zap, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <BarChart2 className="text-primary" size={32} />,
      title: "ניתוח נתונים מתקדם",
      description: "קבל תובנות עמוקות על הביצועים העסקיים שלך עם כלי ניתוח חכמים"
    },
    {
      icon: <Shield className="text-secondary" size={32} />,
      title: "אבטחה מתקדמת",
      description: "הגן על המידע שלך עם שכבות אבטחה מרובות ותקני אבטחה מחמירים"
    },
    {
      icon: <Zap className="text-accent" size={32} />,
      title: "ביצועים מהירים",
      description: "תשתית מהירה ויציבה המבטיחה זמני תגובה מהירים ויעילות מקסימלית"
    },
    {
      icon: <Users className="text-success" size={32} />,
      title: "שיתוף פעולה",
      description: "עבוד בשיתוף פעולה עם הצוות שלך בזמן אמת עם כלי תקשורת מתקדמים"
    }
  ];

  return (
    <section id="features" className="py-16 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            תכונות מתקדמות
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            הכלים המתקדמים שלנו מאפשרים לך להתמקד במה שחשוב באמת - הצמיחה של העסק שלך
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}