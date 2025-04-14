import React from "react";
import { Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const TopBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-500 text-white z-20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex flex-row items-center justify-between gap-4 sm:gap-0">
        {/* Phone Number */}
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <a href="tel:+1234567890" className="text-[13px] sm:text-sm hover:underline">
            0113765226
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <a href="mailto:support@educore.com" className="text-[13px] sm:text-sm hover:underline">
            support@educore.com
          </a>
        </div>

        {/* Social Media Links */}
        <div className=" hidden sm:flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 hover:text-gray-200 transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-gray-200 transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-gray-200 transition-colors" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube className="w-5 h-5 hover:text-gray-200 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;