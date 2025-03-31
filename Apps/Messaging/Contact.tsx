import React, { useState } from 'react';
import { Users, UserPlus, UserCog, UserX, Archive, Search, RefreshCw, Trash2, Edit, ChevronDown, Plus, X, FilePlus, List } from 'lucide-react';

// Define types
type ContactType = 'Students' | 'Teachers' | 'Non Teaching Staff';
type Contact = {
  id: string;
  name: string;
  primaryNumber: string;
  secondaryNumber?: string;
  contactType: ContactType;
  group: string;
};

type Group = {
  name: string;
  contactType: ContactType;
};

const ContactManagementSystem: React.FC = () => {
  // State
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 'eer424435', name: 'reeeeeete', primaryNumber: '0718091444', secondaryNumber: '0718091444', contactType: 'Students', group: 'Default' },
    { id: 'tch123456', name: 'John Smith', primaryNumber: '0712345678', contactType: 'Teachers', group: 'Science' },
    { id: 'tch789012', name: 'Mary Johnson', primaryNumber: '0723456789', contactType: 'Teachers', group: 'Mathematics' },
    { id: 'nts112233', name: 'David Brown', primaryNumber: '0734567890', contactType: 'Non Teaching Staff', group: 'Administration' },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { name: 'Default', contactType: 'Students' },
    { name: 'Chops', contactType: 'Students' },
    { name: 'Science', contactType: 'Teachers' },
    { name: 'Mathematics', contactType: 'Teachers' },
    { name: 'Administration', contactType: 'Non Teaching Staff' },
    { name: 'Maintenance', contactType: 'Non Teaching Staff' },
  ]);

  const [activeContactType, setActiveContactType] = useState<ContactType>('Students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newGroupName, setNewGroupName] = useState('');

  // Form state
  const [newContact, setNewContact] = useState<Omit<Contact, 'id' | 'contactType'>>({
    name: '',
    primaryNumber: '',
    secondaryNumber: '',
    group: '',
  });

  // Helper functions
  const filteredContacts = contacts.filter(contact => {
    const matchesType = contact.contactType === activeContactType;
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.primaryNumber.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const filteredGroups = groups.filter(group => group.contactType === activeContactType);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.primaryNumber || !selectedGroup) return;
    
    const newId = activeContactType === 'Students' 
      ? `st${Math.floor(Math.random() * 900000) + 100000}`
      : activeContactType === 'Teachers'
        ? `tch${Math.floor(Math.random() * 900000) + 100000}`
        : `nts${Math.floor(Math.random() * 900000) + 100000}`;

    const contactToAdd: Contact = {
      id: newId,
      name: newContact.name,
      primaryNumber: newContact.primaryNumber,
      secondaryNumber: newContact.secondaryNumber,
      contactType: activeContactType,
      group: selectedGroup,
    };

    setContacts([...contacts, contactToAdd]);
    setNewContact({ name: '', primaryNumber: '', secondaryNumber: '', group: '' });
    setSelectedGroup('');
    setShowAddModal(false);
  };

  const handleAddGroup = () => {
    if (!newGroupName) return;
    setGroups([...groups, { name: newGroupName, contactType: activeContactType }]);
    setNewGroupName('');
    setShowAddGroupModal(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getIconForContactType = (type: ContactType) => {
    switch (type) {
      case 'Students': return <Users size={20} />;
      case 'Teachers': return <UserCog size={20} />;
      case 'Non Teaching Staff': return <UserX size={20} />;
      default: return <Users size={20} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">School Contact Management System</h1>
        <div className="flex gap-2">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus size={18} />
            Add Contact
          </button>
          <button className="bg-gray-200 text-gray-700 p-2 rounded">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <div className="p-4 font-semibold text-gray-500">GROUPS</div>
          
          <div 
            className={`p-3 flex items-center gap-2 cursor-pointer ${activeContactType === 'Students' ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveContactType('Students')}
          >
            <Users size={18} />
            <span>Students</span>
          </div>
          
          <div 
            className={`p-3 flex items-center gap-2 cursor-pointer ${activeContactType === 'Teachers' ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveContactType('Teachers')}
          >
            <UserCog size={18} />
            <span>Teachers</span>
          </div>
          
          <div 
            className={`p-3 flex items-center gap-2 cursor-pointer ${activeContactType === 'Non Teaching Staff' ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveContactType('Non Teaching Staff')}
          >
            <UserX size={18} />
            <span>Non Teaching Staff</span>
          </div>
          
          <div className="p-3 flex items-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-100">
            <Archive size={18} />
            <span>Archives</span>
          </div>

          <div className="mt-4 px-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">GROUPS</span>
              <button 
                className="text-blue-600 p-1 hover:bg-blue-50 rounded"
                onClick={() => setShowAddGroupModal(true)}
              >
                <Plus size={16} />
              </button>
            </div>
            
            {filteredGroups.map(group => (
              <div key={group.name} className="ml-2 p-2 text-sm hover:bg-gray-100 rounded cursor-pointer flex justify-between items-center">
                <span>{group.name}</span>
                <span className="text-gray-400 text-xs">{contacts.filter(c => c.group === group.name && c.contactType === activeContactType).length}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">ALL {activeContactType.toUpperCase()} CONTACTS</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search contacts"
                    className="pl-10 pr-4 py-2 border rounded-lg w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <div className="relative">
                  <button className="bg-white border rounded-lg px-4 py-2 flex items-center gap-2">
                    Contact Actions
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-8 px-4 py-3 text-left">
                      <input type="checkbox" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Primary Number</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Secondary Number</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Group</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        No contacts found
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input type="checkbox" />
                        </td>
                        <td className="px-4 py-3 text-sm">{contact.id}</td>
                        <td className="px-4 py-3 text-sm">{contact.name}</td>
                        <td className="px-4 py-3 text-sm">{contact.primaryNumber}</td>
                        <td className="px-4 py-3 text-sm">{contact.secondaryNumber || '-'}</td>
                        <td className="px-4 py-3 text-sm">{contact.group}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <Edit size={16} />
                            </button>
                            <button 
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Add Contact</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-4 border-b">
                <button className="p-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                  Add manually one by one
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  Import from Excel file
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Begin by choosing the group to add the contacts to or just create a new one.
                </p>
                
                <div className="flex gap-2">
                  <select 
                    className="form-select border rounded p-2 flex-1" 
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">Select Group</option>
                    {filteredGroups.map(group => (
                      <option key={group.name} value={group.name}>{group.name}</option>
                    ))}
                  </select>
                  
                  <button 
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setShowAddGroupModal(true)}
                  >
                    Create new group
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded p-2" 
                    placeholder="Will be auto-generated"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded p-2" 
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded p-2" 
                    value={newContact.primaryNumber}
                    onChange={(e) => setNewContact({...newContact, primaryNumber: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded p-2" 
                    value={newContact.secondaryNumber || ''}
                    onChange={(e) => setNewContact({...newContact, secondaryNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 p-4 border-t">
              <button 
                className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
                onClick={() => setShowAddModal(false)}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleAddContact}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Create New Group</h2>
              <button onClick={() => setShowAddGroupModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-4">
                  This group will be added to {activeContactType}.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded p-2" 
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Enter group name"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 p-4 border-t">
              <button 
                className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
                onClick={() => setShowAddGroupModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleAddGroup}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagementSystem;