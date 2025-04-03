// src/components/UserActivityLogsTab.tsx
import React from 'react';
import { Activity } from 'lucide-react';

const dummyUserActivityLogs = [
  { id: 1, user: 'John Doe', action: 'Logged in', timestamp: '2025-03-15 08:00' },
  { id: 2, user: 'Alice Brown', action: 'Updated profile', timestamp: '2025-03-20 12:30' },
  { id: 3, user: 'Emma Davis', action: 'Logged out', timestamp: '2025-03-25 17:45' },
];

const UserActivityLogsTab: React.FC = () => {
  return (
    <div className="mt-2 sm:mt-6 p-3 bg-white">
      <h2 className="text-lg font-semibold text-[14px] text-gray-800 flex items-center gap-2">
        <Activity className="w-4 h-4 text-[13px]" /> User Activity Logs
      </h2>
      <div className="overflow-auto scrollbar-hidden min-h-[30vh] mt-4">
        <table className="min-w-full  bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-[13px] text-left text-gray-600">User</th>
              <th className="px-4 py-2 text-[13px] text-left text-gray-600">Action</th>
              <th className="px-4 py-2 text-[13px] text-left text-gray-600">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {dummyUserActivityLogs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-4 py-2 text-[13px]">{log.user}</td>
                <td className="px-4 py-2 text-[13px]">{log.action}</td>
                <td className="px-4 py-2 text-[13px]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivityLogsTab;