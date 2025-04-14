import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ContactInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  setContacts:(value:string[])=>void;
  contacts:string[];
}

const ContactInput: React.FC<ContactInputProps> = ({
  value,
  onChange,
  placeholder = "Enter phone numbers...",
  className = "",
  setContacts,
  contacts
}) => {
  const [inputValue, setInputValue] = useState("");
//   const [contacts, setContacts] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Parse initial value into contacts when component mounts
  useEffect(() => {
    if (value) {
      const numbers = value.split(',').map(num => num.trim()).filter(Boolean);
      setContacts(numbers);
    }
  }, []);

  // Update parent component when contacts change
  useEffect(() => {
    onChange(contacts.join(','));
  }, [contacts, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Check if input contains a number with 10 digits
    const numberMatch = newValue.match(/\d{10}/);
    
    if (numberMatch) {
      const matchedNumber = numberMatch[0];
      const matchIndex = newValue.indexOf(matchedNumber);
      
      // Create a contact chip for this number
      addContact(matchedNumber);
      
      // Clear the matched number from input and keep the rest
      const beforeMatch = newValue.substring(0, matchIndex);
      const afterMatch = newValue.substring(matchIndex + 10);
      setInputValue(beforeMatch + afterMatch);
    }
  };

  const addContact = (contact: string) => {
    if (contact && !contacts.includes(contact)) {
      setContacts([...contacts, contact]);
    }
  };

  const removeContact = (contactToRemove: string) => {
    setContacts(contacts.filter(contact => contact !== contactToRemove));
    // Focus back on input after removing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatPhoneNumber = (number: string) => {
    if (number.length === 10) {
      return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
    }
    return number;
  };

  return (
    <div className={`border border-gray-300 w-full rounded-md p-2 max-h-[6rem] overflow-x-auto flex flex-wrap gap-2 items-center min-h-12 ${className}`}>
      {contacts.map((contact, index) => (
        <div 
          key={index} 
          className="bg-purple-100 flex flex-row text-purple-800 px-2 py-1 rounded-md  items-center text-[13px] md:text-[14px]"
        >
          <span>{formatPhoneNumber(contact)}</span>
          <button 
            type="button"
            onClick={() => removeContact(contact)} 
            className="ml-1 text-purple-600 hover:text-purple-800"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        className="flex-grow outline-none min-w-16 text-sm"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={contacts.length === 0 ? placeholder : ""}
      />
    </div>
  );
};

export default ContactInput