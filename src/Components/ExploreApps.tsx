import React from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, BookOpen, MessageCircle } from "lucide-react";

const ExploreApps: React.FC = () => {
  const apps = [
    {
      icon: <Users className="text-yellow-500" size={32} />,
      title: "Parents Portal",
      description:
        "Access real-time updates on grades, attendance, and school events. Stay connected with your child's education.",
    },
    {
      icon: <CreditCard className="text-yellow-500" size={32} />,
      title: "Finance",
      description:
        "Manage school fees effortlessly with secure payments, automated reminders, and detailed financial reports.",
    },
    {
      icon: <BookOpen className="text-yellow-500" size={32} />,
      title: "Academic",
      description:
        "Track student progress, manage classrooms, automate grading, and analyze performance—all in one place.",
    },
    {
      icon: <MessageCircle className="text-yellow-500" size={32} />,
      title: "Communication",
      description:
        "Send messages, updates, and reminders to teachers, students, and parents via SMS or email with ease.",
    },
  ];

  return (
    <div className=" py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title with Animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Explore <span className="text-yellow-500">EduCore</span> Apps
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-[13px] sm:text-lg">
            Discover the tools that make school management seamless and efficient.
          </p>
        </motion.div>

        {/* App Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white rounded-full group-hover:bg-yellow-50 transition-colors duration-300">
                  {app.icon}
                </div>
                <h3 className="ml-3 text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
                  {app.title}
                </h3>
              </div>
              <p className="text-gray-600 text-[13px] sm:text-base">
                {app.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg hover:bg-yellow-600 transition">
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreApps;