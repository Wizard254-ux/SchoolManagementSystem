// Calender.tsx
import React, { useState, useEffect } from 'react';
import { Calendar,X, Clock, Check } from 'lucide-react';

interface ScheduledData {
  date: string;
  time: string;
  timestamp: string;
}
interface CalenderProps{
   showCalender:boolean;
   setShowCalender:(showState:boolean)=>void;
   handleTimeStamp:(timestamp:string)=>void;
}

const Calender: React.FC <CalenderProps>= ({showCalender,setShowCalender,handleTimeStamp}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [minTime, setMinTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMinTime(currentTime);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const now = new Date();
    const today = new Date(now.toDateString());

    setDate(e.target.value);

    if (selectedDate.getTime() === today.getTime()) {
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setMinTime(currentTime);
    } else {
      setMinTime('00:00');
    }
  };

  const handleConfirm = () => {
    if (!date || !time) {
      alert('Please select both date and time');
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (dateTime < now) {
      alert('Please select a future date and time');
      return;
    }

    handleTimeStamp(dateTime.toISOString());

    const scheduledData: ScheduledData = {
      date,
      time,
      timestamp: dateTime.toISOString(),
    };

    console.log('Scheduled:', scheduledData);
    setShowCalender(false);
    setDate('');
    setTime('');
  };

  return (<div className=''>
      {showCalender ?
        <div className="flex fixed flex-col bg-gray-400 rounded-lg z-10000 h-80 w-80 p-[50px] top-[20%] right-[10%] md:right-[30%] gap-4">
            <X className="absolute top-4 right-4 text-white text-2xl hover:text-red-600 transition-colors" size={24} onClick={() => setShowCalender(false)} />
        <div className="relative">
            <Calendar className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 text-white pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 text-white top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min={minTime}
              className="w-full pl-10 pr-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <Check className="mr-2" size={20} />
            Confirm
          </button>
        </div>
        :
        <></>
}</div>
  );
};

export default Calender;