// src/components/ReportSelector.tsx
import React from 'react';
import { MessageSquare, ShoppingCart, Activity } from 'lucide-react';

interface ReportSelectorProps {
  selectedReport: string;
  onReportChange: (report: string) => void;
}

const reportOptions = [
  { value: 'message-logs', label: 'Message logs', icon: MessageSquare },
  { value: 'purchase-history', label: 'Purchase history', icon: ShoppingCart },
  { value: 'user-activity-logs', label: 'User activity logs', icon: Activity },
];

const ReportSelector: React.FC<ReportSelectorProps> = ({ selectedReport, onReportChange }) => {
  return (
    <div className="flex justify-between border-b bg-white border-gray-200 pr-3 md:pr-0">
      {reportOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            onClick={() => onReportChange(option.value)}
            className={`flex items-center gap-2 px-2 md:px-4 py-1 md:py-3 text-[13px] font-medium transition-all duration-200 ${
              selectedReport === option.value
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReportSelector;