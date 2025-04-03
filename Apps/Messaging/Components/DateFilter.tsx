// DateFilter// src/components/DateFilter.tsx
import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}) => {
  return (
    <div className="flex md:flex-row flex-col  pl-2 items-center gap-4 mt-2 md:mt-6">
        <div className='flex gap-4 md:gap-4'>
      <div className="flex items-center gap-2 ">
        <label className="text-gray-700 font-medium text-[13px] md:text-[14px]">From</label>
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="border text-[12px] md:text-[13px] border-gray-300 rounded-lg px-3 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-gray-700  text-[13px] font-medium">To</label>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="border text-[12px] md:text-[13px] border-gray-300 rounded-lg px-3 py-1 sm:py-2focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>
      </div>
      <button
        onClick={onFilter}
        className="px-4 py-2 text-[12px]  sm:text-[13px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Filter by Date
      </button>
    </div>
  );
};

export default DateFilter;