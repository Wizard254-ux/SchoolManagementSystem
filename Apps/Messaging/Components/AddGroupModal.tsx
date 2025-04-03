import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (groupName: string) => void;
  contactType: 'Students' | 'Teachers' | 'Non Teaching Staff';
  initialGroupName?: string;
}

const AddGroupModal: React.FC<Props> = ({ onClose, onSave, contactType, initialGroupName }) => {
  const [groupName, setGroupName] = useState<string>(initialGroupName || '');

  useEffect(() => {
    if (initialGroupName) setGroupName(initialGroupName);
  }, [initialGroupName]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[23rem]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg text-[14px] font-semibold">{initialGroupName ? 'Edit Group' : 'Create New Group'}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="p-4">
          <p className="text-[13px] text-gray-600 mb-4">This group will be added to {contactType}.</p>
          <input 
            type="text" 
            className="w-full border-[1px] border-gray-400 text-[13px]  rounded p-2" 
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t">
          <button className="px-4 py-2 border text-[13px] rounded" onClick={onClose}>Cancel</button>
          <button 
            className="px-4 py-2 text-[13px] bg-blue-600 text-white rounded"
            onClick={() => onSave(groupName)}
          >
            {initialGroupName ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;