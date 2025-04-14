import React, { useState, useEffect } from 'react';
import { X, Search, Check, ChevronDown } from 'lucide-react';
import { getContacts } from './Api';
import { Contact } from '../Contact';

interface ContactSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContacts: (selectedNumbers: string[]) => void;
}

const ContactSelector: React.FC<ContactSelectorProps> = ({ isOpen, onClose, onSelectContacts }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [contactTypes, setContactTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
      
      // Extract unique contact types
      const types = [...new Set(data.map((contact: Contact) => contact.contactType))];
      setContactTypes(types);
    } catch (err) {
      setError('Error loading contacts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleContact = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };
  
  const selectAllByType = (type: string) => {
    const newSelected = new Set(selectedContacts);
    const contactsToToggle = filteredContacts
      .filter(contact => type === 'All' || contact.contactType === type)
      .map(contact => contact.id);
    
    // Check if all contacts of this type are already selected
    const allSelected = contactsToToggle.every(id => newSelected.has(id));
    
    if (allSelected) {
      // If all are selected, deselect them
      contactsToToggle.forEach(id => newSelected.delete(id));
    } else {
      // Otherwise, select all
      contactsToToggle.forEach(id => newSelected.add(id));
    }
    
    setSelectedContacts(newSelected);
  };

  const handleConfirm = () => {
    const selectedNumbers: string[] = [];
    
    contacts.forEach(contact => {
      if (selectedContacts.has(contact.id)) {
        if (contact.primaryNumber) selectedNumbers.push(contact.primaryNumber);
        // if (contact.secondaryNumber) selectedNumbers.push(contact.secondaryNumber);
      }
    });
    
    onSelectContacts(selectedNumbers);
    onClose();
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || contact.contactType === selectedType;
    return matchesSearch && matchesType;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-3 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white  rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-white">
          <h2 className="text-[14px] md:text-[15px] font-semibold text-purple-900">Select Contacts</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="p-4 bg-white">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 text-[14px] md:text-[15px]  top-1/2 transform -translate-y-1/2 text-purple-500" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="border border-gray-200 text-[14px] md:text-[15px]   rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button
                className="flex items-center text-[14px] md:text-[15px]  justify-between border border-gray-200 rounded-lg px-4 py-2 w-full md:w-48 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-gray-700 text-[14px] md:text-[15px] ">{selectedType}</span>
                <ChevronDown size={16} className="text-purple-500" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedType('All');
                        setDropdownOpen(false);
                      }}
                    >
                      All
                    </li>
                    {contactTypes.map((type) => (
                      <li
                        key={type}
                        className="px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedType(type);
                          setDropdownOpen(false);
                        }}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Contact List */}
        <div className="flex-grow overflow-y-auto px-2">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-700"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            <div className="space-y-2 py-2">
              {/* Select All Option */}
              <div className="p-3 hover:bg-purple-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <button
                    className={`flex items-center justify-center w-6 h-6 rounded-md mr-3 ${
                      filteredContacts.every(contact => selectedContacts.has(contact.id))
                        ? 'bg-purple-600 text-white'
                        : 'border border-gray-300 hover:border-purple-500'
                    }`}
                    onClick={() => selectAllByType(selectedType)}
                  >
                    {filteredContacts.every(contact => selectedContacts.has(contact.id)) && 
                      <Check size={16} />
                    }
                  </button>
                  <div>
                    <p className="font-medium text-sm">Select All {selectedType !== 'All' ? selectedType : 'Contacts'}</p>
                    <p className="text-xs text-gray-500">
                      {filteredContacts.length} contacts
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Items */}
              {filteredContacts.map(contact => (
                <div key={contact.id} className="p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <button
                      className={`flex items-center justify-center w-6 h-6 rounded-md mr-3 ${
                        selectedContacts.has(contact.id)
                          ? 'bg-purple-600 text-white'
                          : 'border border-gray-300 hover:border-purple-500'
                      }`}
                      onClick={() => toggleContact(contact.id)}
                    >
                      {selectedContacts.has(contact.id) && <Check size={16} />}
                    </button>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-gray-500">
                        {contact.primaryNumber}{contact.secondaryNumber ? `, ${contact.secondaryNumber}` : ''}
                      </p>
                      <div className="flex mt-1 gap-2">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {contact.contactType}
                        </span>
                        {contact.group && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {contact.group}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg my-4">
                  No contacts found matching your search.
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gradient-to-r from-white to-purple-50 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium text-purple-900">{selectedContacts.size} contacts selected</span>
            {selectedContacts.size > 0 && (
              <span className="text-gray-600"> ({selectedContacts.size * 2} potential numbers)</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border text-[14px] md:text-[15px]  border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedContacts.size === 0}
              className={`px-4 py-2 text-[14px] md:text-[15px]  rounded-lg text-white ${
                selectedContacts.size > 0 
                  ? 'bg-purple-600 hover:bg-purple-700 transition-colors' 
                  : 'bg-purple-300 cursor-not-allowed'
              }`}
            >
              Select ({selectedContacts.size})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSelector;