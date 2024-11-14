import  { useState } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Hexagon className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-purple-600">Talent-Bridge</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium">Home</a>
            <a href="#about" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium">About</a>
            <a href="#services" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium">Services</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium">Pricing</a>
            <a href="#team" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium">Team</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium">Contact Us</a>
            <a href="/signin" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700" >Login</a>

          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-purple-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">Home</a>
            <a href="#about" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">About</a>
            <a href="#services" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">Services</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">Pricing</a>
            <a href="#team" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">Team</a>
            <a href="#contact" className="bg-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;