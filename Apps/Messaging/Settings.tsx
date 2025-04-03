// src/pages/Settings.tsx
import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import SchoolAccount from "./Components/SchoolAccount";
import ChangePassword from "./Components/ChangePassword";
import NavBar from "./Components/NavBar";
import Menu from "./Components/Menu";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"schoolAccount" | "changePassword">(
    "schoolAccount"
  );

  return (
    <div className="flex h-screen overflow-clip flex-col bg-gray-100">
    <NavBar 
        username="AlphaX"
        
      />   
         <div className="flex-1 h-[80vh] overflow-clip flex flex-row bg-gray-100">
      <Menu />
      <div className="flex-1">
      <div className="bg-white border-b  h-[2.5rem] sm:h-fit border-w-1 border-gray-300 p-4 mb-2 ">
          <h1 className="text-gray-500 text-[14px] font-medium">Settings</h1>
        </div> 
      <div className=" bg-gray-100 border-r flex-1 flex flex-row border-gray-200">
      <div className="sm:w-[10rem] w-[5.3rem]   border-r border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-[13px] sm:text-[14px]">Update Your Account</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("schoolAccount")}
              className={`w-full text-left px-1 md:px-4 py-1 flex items-center space-x-3 rounded-md ${
                activeTab === "schoolAccount"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <User size={20} />
              <span className="text-[12px] sm:text-[13px]">School Account</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("changePassword")}
              className={`w-full text-left px-2 py-1 flex items-center space-x-3 rounded-md ${
                activeTab === "changePassword"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Lock size={20} />
              <span className="text-[12px] sm:text-[13px]">Change Password</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-[14rem] overflow-auto p-2">
        {activeTab === "schoolAccount" && <SchoolAccount />}
        {activeTab === "changePassword" && <ChangePassword />}
      </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default Settings;