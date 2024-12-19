import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Rocket className="text-primary" size={24} />
            <span className="font-bold text-xl text-gray-800">Vibez</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">תכונות</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">אודות</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">צור קשר</a>
              <button className="bg-gradient-to-l from-primary to-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <NavLink to='/login'>התחל עכשיו</NavLink>
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">תכונות</a>
            <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">אודות</a>
            <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">צור קשר</a>
            <button className="w-full bg-gradient-to-l from-primary to-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              התחל עכשיו
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}