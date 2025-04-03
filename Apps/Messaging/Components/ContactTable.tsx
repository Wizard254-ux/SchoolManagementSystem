import React from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import { Contact } from '../Contact';

interface Props {
  contacts: Contact[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  setShowAddModal:(status:boolean)=>void;
  activeContactType:string

}

const ContactTable: React.FC<Props> = ({ contacts,setShowAddModal,activeContactType, searchTerm, setSearchTerm, onEdit, onDelete }) => {
  return (
    <div className="flex-1 overflow-auto p-4 min-w-[15rem]">
      <div className="flex gap-[15%] items-center mb-4 pr-6 md:p-4">
        <h2 className="text-lg font-semibold text-[13px] md:text-[14px]">ALL CONTACTS</h2>
        <div className="relative ">
          <input
            type="text"
            placeholder="Search by name or number"
            className="pl-10 pr-0 md:pr-4 py-1 md:py-2  border rounded-lg w-64 text-[13px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button 
          className="bg-blue-600 text-white px-1
          md:px-4 hover:bg-blue-700 text-[13px] py-1 md:py-2 rounded"
          onClick={() => setShowAddModal(true)}
        >
          {/* Dynamically set button text based on activeContactType */}
          Add {activeContactType.slice(0, -1)} {/* Removes 's' from "Students" etc. */}
        </button>
      </div>

      <div className="bg-white w-full rounded-lg mr-3 md:mr-0 shadow min-w-[30rem] overflow-auto scrollbar-hidden">
        <table className="w-full ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 md:px-4 py-1 md:py-3 text-left text-[12px] md:text-[13px]  font-medium text-gray-600">ID</th>
              <th className="px-3 md:px-4 py-1 md:py-3 text-left text-[12px] md:text-[13px]  font-medium text-gray-600">Name</th>
              <th className="px-3 md:px-4 py-1 md:py-3 text-left text-[12px] md:text-[13px]  font-medium text-gray-600">Primary Number</th>
              <th className="px-3 md:px-4 py-1 md:py-3 text-left text-[12px] md:text-[13px]  font-medium text-gray-600">Secondary Number</th>
              <th className="px-3 md:px-4 py-1 md:py-3 text-left text-[12px] md:text-[13px]  font-medium text-gray-600">Group</th>
              <th className="px-3 md:px-4 py-1 md:py-3 text-left text-[12px] md:text-[13px]  font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id} className="border-t hover:bg-gray-50">
                <td className="px-3 md:px-4 py-1 md:py-3 text-[12px] md:text-[13px] ">{contact.id}</td>
                <td className="px-3 md:px-4 py-1 md:py-3 text-[12px] md:text-[13px] ">{contact.name}</td>
                <td className="px-3 md:px-4 py-1 md:py-3 text-[12px] md:text-[13px] ">{contact.primaryNumber}</td>
                <td className="px-3 md:px-4 py-1 md:py-3 text-[12px] md:text-[13px] ">{contact.secondaryNumber || '-'}</td>
                <td className="px-3 md:px-4 py-1 md:py-3 text-[12px] md:text-[13px] ">{contact.group}</td>
                <td className="px-3 md:px-4 py-1 md:py-3 text-[12px] md:text-[13px] ">
                  <button 
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2"
                    onClick={() => onEdit(contact)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;