import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, RefreshCcw, Search } from 'lucide-react';
import { api } from '../../../src/Api';
import { deleteMessages, resendFailedMsgs } from './Api';
import { BackendMessage } from './Api';
import { getSocket,disconnectSocket } from './socket';

// Define the type for a message (simplified to use status directly)
interface Message {
  id: string;
  type: string; // Derived from textMessage or status
  sentOn: string; // Derived from createdAt
  status: string; // Direct from backend (e.g., "Failed", "Sent", "Pending")
  recipients: string[]; // From backend
  textMessage: string; // Full message from backend
}


interface EmailDashboardProps {
  updatedMessage: BackendMessage[] | null;
  setUpdatedMessage: React.Dispatch<React.SetStateAction<BackendMessage[] | null>>;
}


const EmailDashboard: React.FC <EmailDashboardProps> = ({ updatedMessage, setUpdatedMessage }) => {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All'); // Changed to "All" since no category
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>('');

  useEffect(()=>{
    (async()=>{
      if(updatedMessage){

        const mappedMessages: Message[] = updatedMessage.map((msg) => {
          console.log(msg)
          const date = new Date(msg.status=='Pending'?msg.scheduledDate:msg.createdAt);
          const sentOn = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
          return {
            id: msg.id,
            type: msg.textMessage, // First line of textMessage as type
            sentOn,
            status: msg.status, // Use status directly
            recipients: msg.recipients,
            textMessage: msg.textMessage,
          };
        });

        setMessages((prev)=>([...mappedMessages,...prev]));
        setUpdatedMessage(null)
        console.log("Messages updated:", messages);


      }

    })();
  },[updatedMessage])

  useEffect(() => {
    const socket = getSocket();
    const handleStatusUpdate = (message: any) => {
      console.log('Received message update:', message);
    
      setMessages((prev) => {
        const updated = [...prev]; // clone the array
    
        for (let i = 0; i < updated.length; i++) {
          if (updated[i].id === message.id) {
            updated[i] = { ...updated[i], status: message.status };
            break; // stop looping once found
          }
        }
    
        return updated;
      });
    };

    socket?.on('messageStatusUpdate',handleStatusUpdate)

    return () => {
      socket?.off('messageStatusUpdate', handleStatusUpdate);
      // disconnectSocket()
    };
  }, []);


  // Fetch data from backend
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/messages/all');


      const data: BackendMessage[] = await response.data;

      // Map backend data to Message interface
      const mappedMessages: Message[] = data.map((msg) => {
        console.log(msg)
        const date = new Date(msg.status=='Pending'?msg.scheduledDate:msg.createdAt);
        const sentOn = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return {
          id: msg.id,
          type: msg.textMessage, // First line of textMessage as type
          sentOn,
          status: msg.status, // Use status directly
          recipients: msg.recipients,
          textMessage: msg.textMessage,
        };
      });

      setMessages(mappedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('Failed to load messages from the server.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages based on active tab, filter type, and search query
  const filteredMessages = messages.filter((message) => {
    const matchesTab = activeTab === 'All' || message.status === activeTab; 
    const matchesFilter = filterType ? message.type === filterType : true;
    const matchesSearch = searchQuery
      ? message.textMessage.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTab && matchesFilter && matchesSearch;
  });

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedMessages([]);
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
  const handleMessageAction = async(action: string) => {
    if (selectedMessages.length === 0) {
      alert('Please select at least one message to perform an action.');
      return;
    }
    setSelectedAction(action)

    if (action === 'delete') {
      console.log('deleting data ')
      try{
        const res=await deleteMessages(selectedMessages)
        console.log(res)
        setSelectedAction('')

        setMessages((prev) => prev.filter((msg) => !selectedMessages.includes(msg.id)));
        setSelectedMessages([]);

        
      }catch(error:any){
        console.log(error)
        setSelectedAction('')

      }
    }else if (action === 'RetrySending') {
      console.log('retry the failed messages')
      try{
        const res=await resendFailedMsgs(selectedMessages)
        setSelectedAction('')

        console.log(res)

        
      }catch(error:any){
        console.log(error)
        setSelectedAction('')

      }
      alert(`Marked ${selectedMessages} messages as read.`);
      setSelectedMessages([]);

  }};

  // Handle refresh
  const handleRefresh = () => {
    fetchMessages();
    setSelectedMessages([]);
    setFilterType(null);
    setSearchQuery('');
    setShowSearch(false);
  };

  // Handle search toggle and input
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-2 bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/5 flex md:flex-col flex-row w-full md:bg-white border-r border-gray-300 p-2 md:p-4">
        <div className="md:flex hidden items-center mb-4">
          <h2 className="md:text-lg font-semibold text-[14px]">2025</h2>
          <ChevronDown className="ml-2 h-5 hover:cursor-pointer w-5 text-gray-500" />
        </div>
        <ul className="flex md:min-w-0 md:flex-col md:justify-between space-y-2 w-full scrollbar-hidden overflow-auto">
          {['All', 'Delivered', 'Pending', 'Failed'].map((tab) => (
            <li
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex max-w-[10rem] hover:bg-blue-100 text-[12px] md:text-[13px] transition duration-300 hover:cursor-pointer items-center px-2 py-1 rounded cursor-pointer ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
            >
              <ChevronRight className="h-4 w-4 mr-2" />
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-6 py-6 pt-2 h-80 mb-5">
        {/* Header */}
        <div className="flex min-w-[18rem] overflow-auto scrollbar-hidden px-4 pb-2 md:pb-0 justify-between items-center mb-3">
          <div className="flex items-center space-x-2 mr-2 md:mr-0">
            <select
              className="border border-gray-300 rounded px-2 py-1 text-[12px] md:text-[13px]"
              onChange={(e) => handleMessageAction(e.target.value)}
              defaultValue={''}
              value={selectedAction}

            >
              <option value="" disabled>
                Message Actions
              </option>
              <option className="text-[12px] md:text-[13px]" value="delete">
                Delete
              </option>
              {/* <option className="text-[12px] md:text-[13px]" value="markAsRead">
                Mark as Read
              </option> */}
              {activeTab=='Failed'&&
              <option className="text-[12px] md:text-[13px]" value="RetrySending">
                Retry Sending
              </option>
          }
            </select>
            <button className='text-[13px] text-blue-500 hover:text-blue-700' onClick={()=>setSelectedAction('')}>
              
              Reset
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="flex text-[12px] md:text-[13px] hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer items-center border border-gray-300 rounded px-3 py-1"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={toggleSearch}
              className="flex text-[12px] md:text-[13px] hover:scale-105 transform transition duration-300 ease-in-out hover:cursor-pointer items-center border border-gray-300 rounded px-3 py-1"
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
              placeholder="Search by message text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>
        )}

        {/* Table */}
        <div className="bg-white max-h-80 min-w-[18rem] px-4 overflow-auto rounded-lg shadow mb-8">
          <table className="w-full text-left mb-14">
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
                <th className="p-3 text-[13px] font-semibold text-gray-600">Sent On</th>
                <th className="p-3 text-[13px] font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-3 text-[14px] text-center text-gray-500">
                    Loading messages...
                  </td>
                </tr>
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr key={message.id} className="border-t border-gray-200">
             <td className="p-3 text-[13px] max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedMessages.includes(message.id)}
                  onChange={() => handleSelectMessage(message.id)}
                  className="mr-2 text-[12px]"
                />
                {message.type}
              </td>
                    <td className="p-3 text-[12px]">{message.sentOn}</td>
                    <td className="p-3 text-[12px]">{message.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-3 text-[14px] text-center text-gray-500">
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