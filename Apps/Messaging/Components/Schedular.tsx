// Scheduler.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';

interface ScheduledData {
  date: string;
  time: string;
  timestamp: string;
}

const Scheduler: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
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

    const scheduledData: ScheduledData = {
      date,
      time,
      timestamp: dateTime.toISOString(),
    };

    console.log('Scheduled:', scheduledData);
    setShowPicker(false);
    setDate('');
    setTime('');
  };

  return (
    <div className="p-4">
      {!showPicker ? (
        <button
          onClick={() => setShowPicker(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <Calendar className="mr-2" size={20} />
          Schedule
        </button>
      ) : (
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min={minTime}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <Check className="mr-2" size={20} />
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Scheduler;