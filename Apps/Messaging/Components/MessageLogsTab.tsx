// src/components/MessageLogsTab.tsx
import React from 'react';
import { MessageSquare } from 'lucide-react';

const dummyMessageLogs = [
  { id: 1, sender: 'John Doe', recipient: 'Jane Smith', message: 'Hey, how are you?', timestamp: '2025-03-15 10:30' },
  { id: 2, sender: 'Alice Brown', recipient: 'Bob Wilson', message: 'Meeting at 2 PM', timestamp: '2025-03-20 14:00' },
  { id: 3, sender: 'Emma Davis', recipient: 'John Doe', message: 'Can you send the report?', timestamp: '2025-03-25 09:15' },
];

const MessageLogsTab: React.FC = () => {
  return (
    <div className="mt-2 sm:mt-6 p-3 bg-white">
      <h2 className="text-lg font-semibold text-[14px] text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-[13px]" /> Message Logs
      </h2>
      <div className="overflow-auto scrollbar-hidden min-h-[30vh] mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left  text-[13px] text-gray-600">Sender</th>
              <th className="px-4 py-2 text-left  text-[13px] text-gray-600">Recipient</th>
              <th className="px-4 py-2 text-left  text-[13px] text-gray-600">Message</th>
              <th className="px-4 py-2 text-left  text-[13px] text-gray-600">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {dummyMessageLogs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-4  text-[13px] py-2">{log.sender}</td>
                <td className="px-4  text-[13px] py-2">{log.recipient}</td>
                <td className="px-4  text-[13px] py-2">{log.message}</td>
                <td className="px-4  text-[13px] py-2">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageLogsTab;