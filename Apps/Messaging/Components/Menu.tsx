import React, { JSX, useEffect, useState } from 'react'
import { MessageSquare, User, BarChart, Settings, Gift } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Menu = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState<string>('');

  useEffect(() => {
    // Extract the active page from the current path
    const path = location.pathname;
    const pathSegments = path.split('/');
    const currentPage = pathSegments[pathSegments.length - 1] || 'Messages';
    
    // Set the active page based on the current URL
    setActivePage(currentPage);
  }, [location.pathname]);

  function handlePageChanges(routeName: string): void {
    setActivePage(routeName);
    navigate(`/apps/communication/${routeName}`);
  }

  return (
    <div className="md:w-64 min-w-[5rem] w-[5rem] sm:w-[10rem] bg-white border h-screen overflow-auto border-w-1 border-gray-300 mr-2">
    {/* Profile Section */}
    <div className="p-4 border-b border-w-1 border-gray-300">
      <div className="flex flex-col items-center">
        <div className="w-16 md:w-24 h-16 md:h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-800 text-lg md:text-2xl font-bold">
          AS
        </div>
        <div className="mt-2 text-center">
          <h2 className="font-medium text-[12px] md:text-[15px]">Alpha Secondary</h2>
          <div className="bg-purple-600 text-white text-[12px] md:text-xs px-2 py-0 md:py-1 rounded-full mt-1">
            Secondary School
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col items-center mt-4 text-sm">
        <span className="text-gray-600  text-xs">SMS balance: 7</span>
        <button className="bg-amber-50 mt-3 sm:mt-0  text-xs border border-amber-200 px-2 py-1 rounded text-amber-800">
          Buy SMS
        </button>
      </div>
    </div>
    
    {/* Menu Section */}
    <div className="py-2">
      <div className="px-4 py-2 text-gray-500 text-sm font-medium">MENU</div>
      <div className="px-2">
        <div onClick={()=>handlePageChanges('Messages')} className={`flex items-center px-2 py-3 ${activePage=='Messages'&&'text-purple-700  border-purple-700 bg-purple-50 border-l-4'} rounded-md `}>
          <MessageSquare size={18} className="ml-4 md:ml-0 mr-3" />
          <span className='text-[14px] hidden md:block'>Messages</span>
        </div>
        <div  onClick={()=>handlePageChanges('Contacts')}  className={`flex items-center px-2 py-3  ${activePage=='Contacts'&&'text-purple-700  border-purple-700 bg-purple-50 border-l-4'} text-gray-700 hover:bg-gray-100 rounded-md`}>
          <User size={18} className="ml-4 md:ml-0 mr-3" />
          <span className='text-[14px]  hidden md:block'>Contacts</span>
        </div>
        <div  onClick={()=>handlePageChanges('Reports')}  className={`flex items-center px-2 py-3  ${activePage=='Reports'&&'text-purple-700  border-purple-700 bg-purple-50 border-l-4'} text-gray-700 hover:bg-gray-100 rounded-md`}>
          <BarChart size={18} className="ml-4 md:ml-0 mr-3" />
          <span className='text-[14px]  hidden md:block'>Reports</span>
        </div>
        <div  onClick={()=>handlePageChanges('Settings')}  className={`flex items-center px-2 py-3  ${activePage=='Settings'&&'text-purple-700  border-purple-700 bg-purple-50 border-l-4'} text-gray-700 hover:bg-gray-100 rounded-md`}>
          <Settings size={18} className="ml-4 md:ml-0 mr-3" />
          <span className='text-[14px]  hidden md:block'>Settings</span>
        </div>
        <div    className={`flex items-center px-2 py-3  ${activePage=='Deals'&&'text-purple-700  border-purple-700 bg-purple-50 border-l-4'} text-gray-700 hover:bg-gray-100 rounded-md`}>
          <Gift size={18} className="ml-4 md:ml-0 mr-3" />
          <span className='text-[14px]  hidden md:block'>Deals</span>
        </div>
     
      </div>
    </div>
  </div>  )
}

export default Menu