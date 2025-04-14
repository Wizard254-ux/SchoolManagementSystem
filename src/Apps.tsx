import React, { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, BookOpen, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import SchoolAccountOverlay from "./Components/CreateSchoolOverlay";
import { checkSchoolAccount } from "./Api";
import TopBar from "./Components/TopBar";

const AppsPage: React.FC = () => {
  const navigate = useNavigate();
  const [hasAccount,setHasAccount]=useState<boolean>(false)
  const [loading,setLoading]=useState(true)
  const [isSchoolOverlay,setSchoolOverlay]=useState(false)

  const handleSchoolOverlay=(param:boolean)=>{
    setSchoolOverlay(param)
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await checkSchoolAccount();
        setHasAccount(true)
        localStorage.setItem('hasAccount',true.toString())
        setLoading(false)
        console.log(res);
      } catch (error: any) {
        if (!error.response?.status) {
          setHasAccount(false)
          console.log('Network error');
          setLoading(false)
        } else {
          setHasAccount(false)
          setLoading(false)
          console.log(error.response.data.message);
        }
      }
    })(); 
  }, []);
  
  const apps = [
    {
      icon: <Users className="text-yellow-500" size={40} />,
      title: "Parents Portal",
      description:
        "Access real-time updates on grades, attendance, and school events. Stay connected with your child's education.",
      route: "/apps/parents-portal",
    },
    {
      icon: <CreditCard className="text-yellow-500" size={40} />,
      title: "Finance",
      description:
        "Manage school fees effortlessly with secure payments, automated reminders, and detailed financial reports.",
      route: "/apps/finance",
    },
    {
      icon: <BookOpen className="text-yellow-500" size={40} />,
      title: "Academic",
      description:
        "Track student progress, manage classrooms, automate grading, and analyze performance—all in one place.",
      route: "/apps/academic",
    },
    {
      icon: <MessageCircle className="text-yellow-500" size={40} />,
      title: "Communication",
      description:
        "Send messages, updates, and reminders to teachers, students, and parents via SMS or email with ease.",
      route: "/apps/communication",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 pb-0">
      <TopBar/>
      {isSchoolOverlay &&
      <SchoolAccountOverlay setHasAccount={setHasAccount} handleSchoolOverlay={handleSchoolOverlay}/>
     }
      <div className="max-w-6xl flex flex-col justify-center items-center mx-auto px-6 pb-4">
        {/* Welcome Message */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-yellow-500">EduCore</span>
          </h1>

        {loading==false && (hasAccount? <p className="text-gray-600 text-[13px] sm:text-lg">
            Choose an app to get started.
          </p>:
          <p>Register Institution to access the services</p>
        )
         
        }

        </motion.div>
        {!hasAccount&& !loading &&(
                <button
                onClick={()=>handleSchoolOverlay(true)}
                  className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-600 transition"
                >
                  Create School Account
                </button>
           )}
              </div>
        <div className="flex justify-center p-6">

        {/* Apps Grid */}
        {loading ? 
          <div className="fa-3x self-center">
            <i className="fas fa-circle-notch fa-spin"></i>
           </div>: 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500 group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">{app.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 group-hover:text-yellow-500 transition-colors">
                {app.title}
              </h3>
              <p className="text-gray-600 text-[13px] sm:text-base text-center mb-4">
                {app.description}
              </p>
              <div className="flex justify-center">
                <button
                  disabled={!hasAccount}
                  onClick={() => {if(hasAccount){navigate(app.route)}}}
                  className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-600 transition"
                >
                  Enter
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      }
      </div>
      <Footer/>
    </div>
  );
};

export default AppsPage;