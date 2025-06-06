import React, { useState, useRef } from 'react';
import { 
  User, 
  LogOut, 
  Menu, 
  ChevronDown,
  LucideWallet2,
  BookAIcon,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  username?: string;
  onLogout?: () => void;
  onNavigate?: (appName: string) => void;
}

const NavBar: React.FC<NavbarProps> = ({ 
  username = "Admin", 
  onLogout = () => console.log("Logout clicked"), 
  onNavigate = (app) => console.log(`Navigate to ${app}`)
}) => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const adminTimeoutRef = useRef<number | null>(null);
  const appsTimeoutRef = useRef<number | null>(null);

  const apps = [
    { name: "Communication Portal", icon: <MessageSquare size={18} /> },
    { name: "Finance System", icon: <LucideWallet2 size={18} /> },
    { name: "Academics Center", icon: <BookAIcon size={18} /> }
  ];
  
  const startAdminCloseTimer = () => {
    if (adminTimeoutRef.current) {
      clearTimeout(adminTimeoutRef.current);
    }
    adminTimeoutRef.current = window.setTimeout(() => {
      setShowAdminMenu(false);
      adminTimeoutRef.current = null;
    }, 500);
  };
  
  const cancelAdminCloseTimer = () => {
    if (adminTimeoutRef.current) {
      clearTimeout(adminTimeoutRef.current);
      adminTimeoutRef.current = null;
    }
  };

  const startAppsCloseTimer = () => {
    if (appsTimeoutRef.current) {
      clearTimeout(appsTimeoutRef.current);
    }
    appsTimeoutRef.current = window.setTimeout(() => {
      setShowAppsMenu(false);
      appsTimeoutRef.current = null;
    }, 500);
  };
  
  const cancelAppsCloseTimer = () => {
    if (appsTimeoutRef.current) {
      clearTimeout(appsTimeoutRef.current);
      appsTimeoutRef.current = null;
    }
  };

  return (
    <div className="bg-blue-700 text-white shadow-md mb-2 sticky top-0">
      <div className=" ">
        <div className="flex items-center justify-between h-10 md:h-13">
          {/* Admin section */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              onMouseEnter={() => {
                cancelAdminCloseTimer();
                setShowAdminMenu(true);
              }}
              onMouseLeave={startAdminCloseTimer}
            >
              <User size={20} />
              <span className='text-[13px] md:text-[14px]'>{username}</span>
              <ChevronDown size={16} />
            </button>
            
            {/* Admin dropdown */}
            {showAdminMenu && (
              <div 
                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                onMouseEnter={cancelAdminCloseTimer}
                onMouseLeave={startAdminCloseTimer}
              >
                <button 
                  className="flex items-center px-2 sm:px-4 py-2 text-[12px] sm:text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  onClick={onLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
          
          {/* Apps Menu */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => setShowAppsMenu(!showAppsMenu)}
              onMouseEnter={() => {
                cancelAppsCloseTimer();
                setShowAppsMenu(true);
              }}
              onMouseLeave={startAppsCloseTimer}
            >
              <Menu size={20} />
              <span className='text-[13px] md:text-[14px]'>Apps</span>
              <ChevronDown size={16} />
            </button>
            
            {/* Apps dropdown */}
            {showAppsMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 "
                onMouseEnter={cancelAppsCloseTimer}
                onMouseLeave={startAppsCloseTimer}
              >
                {apps.map((app) => (
                  <button 
                    key={app.name}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      onNavigate(app.name);
                      setShowAppsMenu(false);
                    }}
                  >
                    <span className="mr-3 text-blue-600">{app.icon}</span>
                    {app.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;