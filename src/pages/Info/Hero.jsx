import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function Hero() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            הדרך החכמה לניהול
            <span className="text-primary"> העסק שלך</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            פלטפורמה מתקדמת המאפשרת לך לנהל את העסק שלך בצורה חכמה ויעילה, עם כלים מתקדמים וממשק משתמש נוח
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-l from-primary to-secondary text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-lg font-medium">
              נסה בחינם
            </button>
            <button className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary transition-colors px-8 py-3">
              צפה בהדגמה
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>
        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
            alt="platform preview"
            className="rounded-2xl shadow-2xl w-full"
          />
        </div>
      </div>
    </div>
  );
}