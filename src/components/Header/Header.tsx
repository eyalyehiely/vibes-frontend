import  { useState } from 'react';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import SearchFriends from '../../pages/Home/SearchFriends';
import searchFriends from '../../utils/searchFriends';
import { Bell, Menu } from 'lucide-react';
import toast from 'react-hot-toast';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const token = localStorage.getItem("authTokens");

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await searchFriends(token, setToggleStatus, setIsToggling);
    } catch (error) {
      console.error('Error toggling search friend:', error);
      toast.error('An error occurred while processing your request.');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="text-xl font-semibold text-gray-800">
            Vibez
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <SearchFriends />
            
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${toggleStatus 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isToggling}
            >
              {toggleStatus ? 'Search Active' : 'Enable Search'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <DropdownNotification />
            <div className="h-8 w-px bg-gray-200" />
            <DropdownUser />
          </div>
        </div>
      </div>
      
      <div className="md:hidden p-3 border-t border-gray-200">
        <div className="flex gap-2">
          <SearchFriends />
          <button
            onClick={handleToggle}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
              ${toggleStatus 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isToggling}
          >
            {toggleStatus ? 'Search Active' : 'Enable Search'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;