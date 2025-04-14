import React from "react";
import { motion } from "framer-motion";
import AuthForm from "./Components/AuthForm";
import HowItWorks from "./Components/HowItWorks";
import ExploreApps from "./Components/ExploreApps";
import TopBar from "./Components/TopBar";
import Footer from "./Components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div 
    className="min-h-screen  bg-cover bg-center relative"
>
    <TopBar/>
      {/* Hero Section */}
      <div
      id="Lpage" 
        className="flex fixed inset-0 items-center gap-[2%]  "
  
      >
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl w-full p-6">
            {/* Animated Heading */}
            <motion.div
              className="text-white text-center md:text-left mb-8 md:mb-0"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                MANAGE YOUR SCHOOL <br /> WITH EDUCORE
              </h1>
              <p className="mt-4 text-lg">
                Streamline administration, track student progress, and enhance learning.
              </p>
              <button className="mt-6 bg-yellow-500 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-600 transition">
                Learn More
              </button>
            </motion.div>

            {/* Animated Form */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <AuthForm />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>

      {/* How It Works Section */}
      <div className="bg-gray-200 relative">

      <HowItWorks />
      <ExploreApps/>
      <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;

