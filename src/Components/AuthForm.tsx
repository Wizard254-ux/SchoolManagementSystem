import React, { useState,useEffect } from "react";
import { Lock, Mail, User } from "lucide-react";
import {Login,createUser,AuthEmail, resendCode} from '../Api'
import { useAuth } from "../AuthProvider";
import { ArrowLeft } from "lucide-react";
import { RequestStatusComponent } from "./RequestStatusComponent";
import { RequestStatus } from "./RequestStatusComponent";
import { useNavigate } from 'react-router-dom';


const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [emailCode,setEmailCode]=useState('')
  const [showAuthForm,setShowAuthForm]=useState(true)
  const navigate=useNavigate()

  const {login,setIsAuthorized}=useAuth()
  const [timeLeft, setTimeLeft] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [responseOutput, setResponseOutput] = useState<{message:string,status:RequestStatus}>({
    message: "",
    status: "idle",
  });

  useEffect(() => {
    // If time is up, enable button
    if (timeLeft <= 0) {
      setIsDisabled(false);
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev:any) => prev - 1);
    }, 1000);

    // Cleanup interval on component unmount or when time changes
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitCode=async():Promise<void>=>{
    setIsLoading(true)
    try{
     const res=await AuthEmail(emailCode)
     console.log("Verified succesfully",res);
     setShowAuthForm(true)
     setIsAuthorized(true)
     setIsLoading(false)
     navigate('/apps')
    }
    catch(error:any){
      console.error("Error:", error.message)
      setIsAuthorized(false)
      setResponseOutput({status:'error',message:error.response.data.message})     
      setIsLoading (false)  

      
    }
  }
  
  const handleClick = async() => {
    console.log('handling rsending')
    setIsLoading(true)
    try{
      const res=await resendCode()
      if (!isDisabled) {
        setTimeLeft(15);
        setIsDisabled(true);
      }
      console.log(res)
      setIsLoading(false)
      
    }catch(error:any){
      console.log(error.response.data.message)
      setResponseOutput({status:'error',message:error.response.data.message})     
      setIsLoading(false) 

    }
  };
  
  const handleSubmit =async (e: React.FormEvent):Promise<void> => {
    e.preventDefault();
    try{
      setIsLoading(true)
      
      if (isLogin) {
        const res=await Login(formData.email, formData.password)
        login(res)
        console.log(res)
        setShowAuthForm(false)
        
        setTimeLeft(15)
        console.log("Login succesfully");
        
      } else {
        const res=await createUser(formData.username,formData.email, formData.password)
        login(res)
        setShowAuthForm(false)
        setTimeLeft(15)
      console.log("Account created succesfully");

    }
    setIsLoading(false)
  }
    catch(error:any){
      setIsLoading(false)
      setShowAuthForm(true)
      setIsDisabled(true)
      console.log("Error:", error.response.data.message)
      setResponseOutput({status:'error',message:error.response.data.message})      
    }
  };

  useEffect(()=>{
   setTimeout(()=>{
   setResponseOutput(
    {
      message: "",
      status: "idle",
    }
   )
   },10000)
  },[responseOutput])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
     {responseOutput.message && <RequestStatusComponent status={responseOutput.status} message={responseOutput.message}/>}
      {!showAuthForm  && <button
          type="submit"
          disabled={isDisabled || isLoading}
          onClick={handleClick}
          className="w-full bg-yellow-500 text-[14px] md:text-[15px] mb-2 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition"
        >
       { isDisabled ? `resend code in ${timeLeft}s` : "Resend Code"}        
       </button>
      }

      <h2 className="flex justify-between text-2xl font-semibold mb-4">
        {isLogin ? "Login to EduCore" : "Register for EduCore"}{!showAuthForm && <ArrowLeft onClick={()=>setShowAuthForm(true)} size={23} className="font-[13px] hover:bg-amber-600 bg-amber-500 rounded-full "/>}
      </h2>
      {!showAuthForm&&<><span className="text-[13px] md:text-[15px]">Enter Verification code sent to your email</span>
      <div className="mb-4 relative">
          <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            name="email"
            value={emailCode}
            onChange={(e)=>setEmailCode(e.target.value.trim())}
            placeholder="Verification code"
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!emailCode || emailCode.length < 4 || isLoading}
          onClick={()=>{
            if (emailCode && emailCode.length >= 4) {
              submitCode();
            }
          }}
          className="w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition"
        >
          {isLoading?<div className="fa-1x ">
          <i className="fas fa-circle-notch fa-spin text-white"></i>
           </div>:
          <span>Submit Code</span>
        }
        </button>
       </>
      }
      {showAuthForm && <><form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4 relative">
          <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Username Field (only for registration) */}
        {!isLogin && (
          <div className="mb-4 relative">
            <User className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
        )}

        {/* Password Field */}
        <div className="mb-4 relative">
          <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
        disabled={isLoading}
          type="submit"
          className="w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition"
        >
          {isLoading?<div className="fa-1x ">
            <i className="fas fa-circle-notch fa-spin text-white"></i>
             </div>
            :isLogin ? "Login" : "Register"
          }
        </button>
      </form>

      {/* Toggle between Login and Register */}
      <p className="mt-4 text-center text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
         disabled={isLoading}
          onClick={() => setIsLogin(!isLogin)}
          className="text-yellow-500 hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
      </>}
    </div>
  );
};

export default AuthForm;