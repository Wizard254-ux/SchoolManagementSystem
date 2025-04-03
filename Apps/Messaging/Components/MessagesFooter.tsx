import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RefreshCcw, Search } from 'lucide-react';

// Define the type for a message
interface Message {
  id: string;
  type: string;
  sentOn: string;
  delivered: number;
  pending: number;
  failed: number;
  category: string; // Added to filter by category (Replies, Sent, etc.)
}

const EmailDashboard: React.FC = () => {
  // Sample data
  const initialMessages: Message[] = [
    { id: '1', type: 'pdf', sentOn: '04:53 PM', delivered: 1, pending: 0, failed: 0, category: 'Sent' },
    { id: '2', type: 'pdf', sentOn: '11:48 AM', delivered: 1, pending: 0, failed: 0, category: 'Sent' },
    { id: '3', type: 'hello', sentOn: '10:50 AM', delivered: 1, pending: 0, failed: 0, category: 'Sent' },
    { id: '4', type: 'doc', sentOn: '09:30 AM', delivered: 0, pending: 1, failed: 0, category: 'Scheduled' },
    { id: '5', type: 'txt', sentOn: '08:15 AM', delivered: 0, pending: 0, failed: 1, category: 'Outbox' },
  ];

  // State management
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeTab, setActiveTab] = useState<string>('Sent');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Filter messages based on active tab, filter type, and search query
  const filteredMessages = messages.filter((message) => {
    const matchesTab = message.category === activeTab;
    const matchesFilter = filterType ? message.type === filterType : true;
    const matchesSearch = searchQuery
      ? message.type.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTab && matchesFilter && matchesSearch;
  });

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedMessages([]); // Reset selected messages when changing tabs
  };

  // Handle message selection
  const handleSelectMessage = (id: string) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  // Handle select all messages
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedMessages(filteredMessages.map((msg) => msg.id));
    } else {
      setSelectedMessages([]);
    }
  };

  // Handle message actions
  const handleMessageAction = (action: string) => {
    if (selectedMessages.length === 0) {
      alert('Please select at least one message to perform an action.');
      return;
    }

    if (action === 'delete') {
      setMessages((prev) => prev.filter((msg) => !selectedMessages.includes(msg.id)));
      setSelectedMessages([]);
    } else if (action === 'markAsRead') {
      alert(`Marked ${selectedMessages.length} messages as read.`);
      setSelectedMessages([]);
    }
  };

  // Handle filter toggle and apply filter


  // Handle refresh
  const handleRefresh = () => {
    setMessages(initialMessages); // Simulate refreshing data
    setSelectedMessages([]);
    setFilterType(null);
    setSearchQuery('');
    setShowSearch(false);
  };

  // Handle search toggle and input
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) {
      setSearchQuery(''); // Clear search query when closing
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-2 bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/5 flex md:flex-col flex-row w-full  md:bg-white border-r border-gray-300 p-2 md:p-4">
        <div className="md:flex hidden items-center mb-4">
          <h2 className="md:text-lg font-semibold  text-[14px]">2025</h2>
          <ChevronDown className="ml-2 h-5 hover:cursor-pointer w-5 text-gray-500" />
        </div>
        <ul className="flex  md:min-w-0 md:flex-col md:justify-between space-y-2 w-full scrollbar-hidden overflow-auto">
          {['Replies', 'Sent', 'Scheduled', 'Outbox', 'Archives'].map((tab) => (
            <li
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex max-w-[10rem] hover:bg-blue-100 text-[12px] md:text-[13px]  transition  duration-300 hover:cursor-pointer items-center px-2 py-1 rounded cursor-pointer ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
            >
              <ChevronRight className="h-4  w-4 mr-2" />
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-6 py-6 pt-2 h-80  mb-5">
        {/* Header */}
        <div className="flex min-w-[18rem] overflow-auto scrollbar-hidden px-4 pb-2 md:pb-0  justify-between items-center mb-3">
          <div className="flex items-center space-x-2 mr-2 md:mr-0">
            <select
              className="border border-gray-300 rounded px-2 py-1 text-[12px] md:text-[13px]"
              onChange={(e) => handleMessageAction(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Message Actions
              </option>
              <option className='text-[12px] md:text-[13px]' value="delete">Delete</option>
              <option className='text-[12px] md:text-[13px]' value="markAsRead">Mark as Read</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
         
            <button
              onClick={handleRefresh}
              className="flex text-[12px] md:text-[13px] hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer items-center border border-gray-300 rounded px-3 py-1 "
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={toggleSearch}
              className="flex text-[12px] md:text-[13px] hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer items-center border border-gray-300 rounded px-3 py-1 "
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>
          </div>
        </div>



        {/* Search UI */}
        {showSearch && (
          <div className="mb-4 p-4 bg-white rounded-lg shadow">
            <input
              type="text"
              placeholder="Search by type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>
        )}

        {/* Table */}
        <div className="bg-white min-w-[18rem] px-4 overflow-auto rounded-lg shadow mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-600">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      filteredMessages.length > 0 &&
                      selectedMessages.length === filteredMessages.length
                    }
                    className="mr-2"
                  />
                  Text
                </th>
                <th className="p-3  text-[13px] font-semibold text-gray-600">Sent On</th>
                <th className="p-3  text-[13px] font-semibold text-gray-600">Delivered</th>
                <th className="p-3  text-[13px] font-semibold text-gray-600">Pending</th>
                <th className="p-3  text-[13px] font-semibold text-gray-600">Failed</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr key={message.id} className="border-t border-gray-200">
                    <td className="p-3 text-[13px] ">
                      <input
                        type="checkbox"
                        checked={selectedMessages.includes(message.id)}
                        onChange={() => handleSelectMessage(message.id)}
                        className="mr-2 text-[12px]"
                      />
                      {message.type}
                    </td>
                    <td className="p-3  text-[12px]">{message.sentOn}</td>
                    <td className="p-3  text-[12px]">{message.delivered}</td>
                    <td className="p-3  text-[12px]">{message.pending}</td>
                    <td className="p-3  text-[12px]">{message.failed}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-[14px] text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailDashboard;