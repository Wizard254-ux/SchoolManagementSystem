import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">EduCore</h3>
            <p className="text-gray-400 text-[13px] sm:text-sm">
              Empowering schools with seamless management solutions.
            </p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-[13px] sm:text-sm hover:text-yellow-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-yellow-500" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 text-[13px] sm:text-sm hover:text-yellow-500 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-yellow-500" />
                <a
                  href="mailto:support@educore.com"
                  className="text-gray-400 text-[13px] sm:text-sm hover:text-yellow-500 transition-colors"
                >
                  support@educore.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright Notice */}
        <motion.div
          className="mt-4 pt-5 border-t border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-[13px] sm:text-sm">
            &copy; {new Date().getFullYear()} EduCore. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;