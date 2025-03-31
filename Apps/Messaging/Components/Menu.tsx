import React,{JSX} from 'react'
import { MessageSquare, User, BarChart, Settings, Gift, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Menu=():JSX.Element=>{
  const navigate = useNavigate();


  function handlePageChanges(routeName:string):void{
    navigate(`/${routeName}`)
  }
    
  return (
    <div className="w-64 bg-white border h-screen overflow-auto border-w-1 border-gray-300 mr-2">
    {/* Profile Section */}
    <div className="p-4 border-b border-w-1 border-gray-300">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-gray-800 text-2xl font-bold">
          AS
        </div>
        <div className="mt-2 text-center">
          <h2 className="font-medium">Alpha Secondary</h2>
          <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-1">
            Secondary School
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-gray-600  text-xs">SMS balance: 7</span>
        <button className="bg-amber-50  text-xs border border-amber-200 px-2 py-1 rounded text-amber-800">
          Buy SMS
        </button>
      </div>
    </div>
    
    {/* Menu Section */}
    <div className="py-2">
      <div className="px-4 py-2 text-gray-500 text-sm font-medium">MENU</div>
      <div className="px-2">
        <div onClick={()=>handlePageChanges('Messages')} className="flex items-center px-2 py-3 text-purple-700 bg-purple-50 rounded-md border-l-4 border-purple-700">
          <MessageSquare size={18} className="mr-3" />
          <span className='text-[14px]'>Messages</span>
        </div>
        <div  onClick={()=>handlePageChanges('Contacts')}  className="flex items-center px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
          <User size={18} className="mr-3" />
          <span className='text-[14px]'>Contacts</span>
        </div>
        <div  onClick={()=>handlePageChanges('Reports')}  className="flex items-center px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
          <BarChart size={18} className="mr-3" />
          <span className='text-[14px]'>Reports</span>
        </div>
        <div  onClick={()=>handlePageChanges('Settings')}  className="flex items-center px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
          <Settings size={18} className="mr-3" />
          <span className='text-[14px]'>Settings</span>
        </div>
        <div  onClick={()=>handlePageChanges('Deals')}  className="flex items-center px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-md">
          <Gift size={18} className="mr-3" />
          <span className='text-[14px]'>Deals</span>
        </div>
     
      </div>
    </div>
  </div>  )
}

export default Menu