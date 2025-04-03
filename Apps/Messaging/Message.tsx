import { JSX, useState } from 'react';
import { Paperclip, Link, Image, HelpCircle, Send, Clock } from 'lucide-react';
import Menu from './Components/Menu'
import MessagesFooter from './Components/MessagesFooter';
import Calender from './Components/Calender';
import NavBar from './Components/NavBar';

type MessageType = 'regular' | 'exam' | 'fee';

const Message =():JSX.Element => {
  const [messageType, setMessageType] = useState<MessageType>('regular');
  const [messageText, setMessageText] = useState<string>('');
  const [recipients, setRecipients] = useState<string>('');
  const [showCalender,setShowCalender]=useState<boolean>(false)
 const [timeStamp,setTimeStamp] = useState<string>('');
  
  const handleCalender=(showState:boolean)=>{
    setShowCalender(showState)
  }
  const handleTimeStamp=(tmeStamp:string)=>{
    setTimeStamp(tmeStamp)
    console.log(timeStamp)
  }



  return (
    <div className="flex h-screen flex-col bg-gray-100">
  <NavBar 
      username="AlphaX"
    />
      {/* Left Sidebar */}
      <div className="flex-1 h-[80vh] overflow-clip flex flex-row bg-gray-100">
      <Menu />
      <Calender showCalender={showCalender} setShowCalender={handleCalender} handleTimeStamp={handleTimeStamp}/>
      {/* Main Content */}
      <div className="flex-1 min-w-[20rem] flex h-screen overflow-auto flex-col">
        {/* Header */}
        <div className="bg-white  h-[2.5rem] sm:h-fit border-b border-w-1 mb-2 border-gray-300 p-4 ">
          <h1 className="text-gray-500 text-[13px] sm:text-[14px] font-medium">MESSAGES</h1>
        </div>
        
        {/* Message Content */}
        <div className="flex-1 ">
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="mb-4">
              <h2 className="font-medium mb-2 text-[13px] md:text-[14px]">What do you like to send today?</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="messageType" 
                    value="regular" 
                    checked={messageType === 'regular'} 
                    onChange={() => setMessageType('regular')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className='text-[13px] md:text-[14px]'>Regular message</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="messageType" 
                    value="exam" 
                    checked={messageType === 'exam'} 
                    onChange={() => setMessageType('exam')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className='text-[13px] md:text-[14px]'>Exam results</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="messageType" 
                    value="fee" 
                    checked={messageType === 'fee'} 
                    onChange={() => setMessageType('fee')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className='text-[13px] md:text-[14px]' >Fee balances</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-2 text-[13px]">Recipients</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="border border-w-1 border-gray-300 rounded-md p-2 w-full"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                />
                <button className="text-blue-500 text-sm text-[13px]">Add from contacts</button>
              </div>
            </div>
            
            <div className="mb-4">
              <textarea 
                className="border border-w-2 border-gray-300 rounded-md p-2 w-full text-[12px] h-48 resize-none"
                placeholder="Write your message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <div className="text-gray-500 mb-2 text-[12px]">ADD ATTACHMENTS</div>
              <div className="flex gap-4">
                <button className="flex flex-col items-center text-gray-500 text-xs">
                  <div className="p-2 border rounded-md mb-1">
                    <Paperclip size={16} />
                  </div>
                  Files
                </button>
                <button className="flex flex-col items-center text-gray-500 text-xs">
                  <div className="p-2 border rounded-md mb-1">
                    <Link size={16} />
                  </div>
                  Link
                </button>
                <button className="flex flex-col items-center text-gray-500 text-xs">
                  <div className="p-2 border rounded-md mb-1">
                    <Image size={16} />
                  </div>
                  Photos
                </button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className='text-[13px]'>1 pages (0 characters)</span>
                <span className='text-[13px]'>Units consumed: 0</span>
                <HelpCircle size={16} className="text-blue-500" />
              </div>
              <div className="flex mt-3 md:mt-0 gap-3 md:gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6  md:py-2 rounded-md flex items-center text-[12px] md:text-[13px]">
                  <Send size={16} className="mr-2" />
                  Send
                </button>
                <button onClick={()=>setShowCalender(true)} className="bg-gray-100 text-[13px] hover:bg-blue-100 transition duration-200 text-gray-700 px-3 md:px-6 md:py-2 rounded-md flex items-center">
                  <Clock size={16} className="mr-2" />
                  Schedule
                </button>
                <button className="text-blue-500 text-[14px] hover:text-black text-sm">
                  Message Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        <MessagesFooter/>
      </div>
    </div>
    </div>
  );
};

export default Message;