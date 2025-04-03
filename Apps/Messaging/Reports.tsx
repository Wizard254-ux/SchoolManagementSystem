// src/pages/Reports.tsx
import React, { useState } from 'react';
import ReportSelector from './Components/ReportSelector';
import DateFilter from './Components/DateFilter';
import MessageLogsTab from './Components/MessageLogsTab';
import PurchaseHistoryTab from './Components/PurchaseHistoryTab';
import UserActivityLogsTab from './Components/UserActivityLogTab';
import NavBar from './Components/NavBar';
import Menu from './Components/Menu';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('message-logs');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-04-01');

  const handleReportChange = (report: string) => {
    setSelectedReport(report);
  };

  const handleFilter = () => {
    // In a real app, this would trigger an API call or data fetch
    console.log(`Filtering ${selectedReport} from ${startDate} to ${endDate}`);
  };

  const renderTabContent = () => {
    switch (selectedReport) {
      case 'message-logs':
        return <MessageLogsTab />;
      case 'purchase-history':
        return <PurchaseHistoryTab />;
      case 'user-activity-logs':
        return <UserActivityLogsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-clip flex-col bg-gray-100">
    <NavBar 
        username="AlphaX"
        
      />    
      <div className="flex-1 h-[80vh] overflow-clip flex flex-row bg-gray-100">
      <Menu />
      
      <div className="flex-1 h-full  min-h-[150px] overflow-clip pr-2 sm:pr-0 flex flex-col">
        {/* Header */}
        <div className="bg-white h-[2.5rem] sm:h-fit border-b border-w-1 border-gray-300 p-4 mb-2 ">
          <h1 className="text-gray-500  text-[13px] md:text-[14px] font-medium">Reports</h1>
        </div>        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Choose the report you want us to generate for you.
        </h1> */}
        <ReportSelector selectedReport={selectedReport} onReportChange={handleReportChange} />
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onFilter={handleFilter}
        />
        {renderTabContent()}
      </div>
    </div>
    </div>
  );
};

export default Reports;