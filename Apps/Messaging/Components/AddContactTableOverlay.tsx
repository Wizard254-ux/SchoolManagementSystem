import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  primaryNumber: string;
  secondaryNumber?: string;
  contactType: 'Students' | 'Teachers' | 'Non Teaching Staff';
  group: string;
}

interface Group {
  name: string;
  contactType: string;
}

interface Props {
  onClose: () => void;
  onSave: (contact: Omit<Contact, 'id' | 'contactType'>) => void;
  groups: Group[];
  contactType: 'Students' | 'Teachers' | 'Non Teaching Staff';
  initialData?: Contact;
}

/**
 * Modal for adding or editing a contact
 */
const AddContactModal: React.FC<Props> = ({ onClose, onSave, groups, contactType, initialData }) => {
  /**
   * Contact form data
   * @type {Omit<Contact, 'id' | 'contactType'>}
   */
  const [contact, setContact] = useState<Omit<Contact, 'id' | 'contactType'>>(initialData || {
    name: '',
    primaryNumber: '',
    secondaryNumber: '',
    group: ''
  });

  const handleSubmit = () => {
    if (!contact.name || !contact.primaryNumber || !contact.group) return;
    onSave(contact);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[23rem]">
        <div className="flex justify-between items-center  p-4 border-b">
          {/* Display the contact type in the title */}
          <h2 className="text-[14px] font-semibold">
            {initialData ? `Edit ${contactType} Contact` : `Add ${contactType} Contact`}
          </h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Optional: Show contact type as a read-only field */}
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-1">Contact Type</label>
            <input 
              type="text" 
              className="w-full  h-[30px] text-[13px] border-[1px] border-gray-400 rounded p-2 bg-gray-100" 
              value={contactType}
              disabled
            />
          </div>
          
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-1">Name *</label>
            <input 
              type="text" 
              className="w-full text-[13px] border-[1px] border-gray-400 h-[30px]  rounded p-2" 
              value={contact.name}
              onChange={e => setContact({...contact, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-1">Primary Number *</label>
            <input 
              type="text" 
              className="w-full text-[13px] border-[1px] border-gray-400 h-[30px] rounded p-2" 
              value={contact.primaryNumber}
              onChange={e => setContact({...contact, primaryNumber: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-1">Secondary Number</label>
            <input 
              type="text" 
              className="w-full  text-[13px] border-[1px] border-gray-400 h-[30px] rounded p-2" 
              value={contact.secondaryNumber || ''}
              onChange={e => setContact({...contact, secondaryNumber: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-1">Group *</label>
            <select
              className="w-full   border-[1px] border-gray-300 text-[13px] rounded p-2"
              value={contact.group}
              onChange={e => setContact({...contact, group: e.target.value})}
            >
              <option value=""><span  className='text-[13px]' >  Select Group</span></option>
              {groups.map(g => (
                <option key={g.name} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t">
          <button className="px-4 text-[13px] py-2 border-[1px] border-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 text-[13px] py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;