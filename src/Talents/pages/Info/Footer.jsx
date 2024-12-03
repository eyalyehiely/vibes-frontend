import React from 'react';
import { Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Rocket size={24} />
              <span className="font-bold text-xl">סאאס פרו</span>
            </div>
            <p className="text-gray-400">
              פתרונות מתקדמים לניהול העסק שלך
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">מוצר</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">תכונות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">תמחור</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">אבטחה</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">חברה</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">אודות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">בלוג</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">קריירה</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">משפטי</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">פרטיות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">עוגיות</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 סאאס פרו. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}