import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, BookOpen, CreditCard, Users } from "lucide-react";

const HowItWorks: React.FC = () => {
  const features = [
    {
      icon: <MessageCircle className="text-yellow-500" size={32} />,
      title: "EduCore Messaging",
      description: {
        default:
          "Connect teachers, students, and parents instantly. Share updates, send reminders, and schedule meetings via SMS or email.",
        mobile:
          "Connect teachers, students, and parents. Share updates and reminders via SMS or email.",
      },
    },
    {
      icon: <BookOpen className="text-yellow-500" size={32} />,
      title: "EduCore Academics",
      description: {
        default:
          "Manage classrooms, track student progress, analyze results, and automate grading—all in one platform.",
        mobile: "Manage classrooms, track progress, and automate grading.",
      },
    },
    {
      icon: <CreditCard className="text-yellow-500" size={32} />,
      title: "EduCore Finances",
      description: {
        default:
          "Simplify fee collection with automated reminders, secure payments, and detailed financial reports.",
        mobile: "Simplify fee collection with reminders and secure payments.",
      },
    },
    {
      icon: <Users className="text-yellow-500" size={32} />,
      title: "EduCore Parent Portal",
      description: {
        default:
          "Empower parents with real-time access to grades, attendance, reports, and school updates.",
        mobile: "Give parents access to grades, attendance, and updates.",
      },
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-5">
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
            How <span className="text-yellow-500">EduCore</span> Works
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-[13px] sm:text-lg">
            Streamline your school's operations with our powerful yet intuitive platform
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:justify-between items-center gap-[2%]">
          {/* Laptop Image with Fixed Height on Large Screens */}
          <motion.div
            className="w-full md:w-1/2 relative mb-5 md:mb-0"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-yellow-500 absolute -top-3 -left-3 w-full h-full rounded-lg opacity-20 z-0 md:h-[500px]"></div>
            <img
              src="https://media.istockphoto.com/id/874138734/photo/social-media-profile.jpg?s=1024x1024&w=is&k=20&c=zMI1K-xkcrXixcyV6Rc3bW_gt8vKJ1_33zAKuuUA8Ig="
              alt="Laptop showing EduCore"
              className="rounded-lg shadow-xl w-full object-cover relative z-10 md:h-[500px]"
            />
          </motion.div>

          {/* Feature Cards with Fixed Height on Large Screens */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:h-[500px]">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 max-h-[fit] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gray-100 rounded-full group-hover:bg-yellow-50 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="ml-3 text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-[13px] sm:text-base">
                  <span className="block sm:hidden">{feature.description.mobile}</span>
                  <span className="hidden sm:block">{feature.description.default}</span>
                </p>
            
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;