import React from 'react';
import { Users, UserCog, UserX, Archive, Plus, Edit, Trash2,Group } from 'lucide-react';

interface Props {
  activeContactType: 'Students' | 'Teachers' | 'Non Teaching Staff';
  setActiveContactType: (type: 'Students' | 'Teachers' | 'Non Teaching Staff') => void;
  groups: { name: string; contactType: string }[];
  setShowAddGroupModal: (show: boolean) => void;
  onEditGroup: (group: { name: string; contactType: string }) => void;
  onDeleteGroup: (groupName: string) => void;
}

const Sidebar: React.FC<Props> = ({ activeContactType, setActiveContactType, groups, setShowAddGroupModal, onEditGroup, onDeleteGroup }) => {
  return (
    <div className="w-[5rem] md:w-64 bg-white shadow-sm">
      <div className="p-4 font-semibold text-gray-500 text-[12px] md:text-[14px]">GROUPS</div>
      
      {(['Students', 'Teachers', 'Non Teaching Staff'] as const).map(type => (
        <div 
          key={type}
          className={`p-3 flex items-center gap-2 cursor-pointer ${activeContactType === type ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setActiveContactType(type)}
        >
          {type === 'Students' && <Users size={18} className='ml-[35%] md:ml-0'/>}
          {type === 'Teachers' && <UserCog size={18} className='ml-[35%] md:ml-0'/>}
          {type === 'Non Teaching Staff' && <UserX size={18} className='ml-[35%] md:ml-0'/>}
          <span className='text-[13px] hidden md:flex'>{type}</span>
        </div>
      ))}
      <div className="mt-4 px-4">
        <div className="flex justify-between items-center mb-2  flex-col sm:flex-row">
          <span className="text-[12px] font-medium text-gray-500 md:text-[14px]  md:flex">GROUPS</span>
          <button 
            className="text-blue-600 p-1 hover:bg-blue-50 rounded"
            onClick={() => setShowAddGroupModal(true)}
          >
            <Plus size={16} />
          </button>
        </div>
        
        {groups.map(group => (
          <div key={group.name} className="ml-2 p-2 text-sm hover:bg-gray-100 rounded cursor-pointer flex justify-between items-center">
            <span>{group.name}</span>
            <div>
              <button 
                className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-1"
                onClick={() => onEditGroup(group)}
                title="Edit Group"
              >
                <Edit size={14} />
              </button>
              <button 
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                onClick={() => onDeleteGroup(group.name)}
                title="Delete Group"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;