import React, { useState, useEffect } from 'react';
import Sidebar from './Components/ContactSideBar';
import ContactTable from './Components/ContactTable';
import AddContactModal from './Components/AddContactTableOverlay';
import AddGroupModal from './Components/AddGroupModal';
import * as api from './Components/Api';
import NavBar from './Components/NavBar';
import Menu from './Components/Menu';

// Types
export type ContactType = 'Students' | 'Teachers' | 'Non Teaching Staff';

export interface Contact {
  id: string;
  name: string;
  primaryNumber: string;
  secondaryNumber?: string;
  contactType: ContactType;
  group: string;
}
interface Group {
  name: string;
  contactType: ContactType;
}

const ContactManagementSystem: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeContactType, setActiveContactType] = useState<ContactType>('Students');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  useEffect(() => {
    api.getContacts().then((data: Contact[]) => setContacts(data));
    api.getGroups().then((data: Group[]) => setGroups(data));
  }, []);

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setShowAddGroupModal(true);
  };

  const handleDeleteGroup = (groupName: string) => {
    if (contacts.some(c => c.group === groupName)) {
      alert('Cannot delete group with assigned contacts.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the group "${groupName}"?`)) {
      api.deleteGroup(groupName).then(() => {
        setGroups(groups.filter(g => g.name !== groupName));
      });
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
    <NavBar 
        username="AlphaX"
      />
        {/* Left Sidebar */}
        <div className="flex-1 h-[80vh] overflow-clip flex flex-row bg-gray-100">
        <Menu />

        <div className="flex-1 h-full min-w-[20rem] flex overflow-auto flex-col">
        {/* Header */}
        <div className="bg-white  h-[2.5rem] sm:h-fit border-b border-w-1 border-gray-300 p-4 mb-2 ">
          <h1 className="text-gray-500 text-[14px] font-medium">Contacts</h1>
        </div>
              <div className="flex flex-1 overflow-clip">
        
        <Sidebar 
          activeContactType={activeContactType}
          setActiveContactType={setActiveContactType}
          groups={groups.filter(g => g.contactType === activeContactType)}
          setShowAddGroupModal={setShowAddGroupModal}
          onEditGroup={handleEditGroup}
          onDeleteGroup={handleDeleteGroup}
        />
        
        <ContactTable 
        setShowAddModal={(status:boolean)=>setShowAddModal(status)}
        activeContactType={activeContactType}
          contacts={contacts.filter(c => 
            c.contactType === activeContactType && 
            (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             c.primaryNumber.includes(searchTerm))
          )}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onEdit={(contact: Contact) => setEditingContact(contact)}
          onDelete={(id: string) => {
            api.deleteContact(id).then(() => {
              setContacts(contacts.filter(c => c.id !== id));
              if (editingContact?.id === id) setEditingContact(null);
            });
          }}
        />
      </div>
      </div>

      {showAddModal && (
        <AddContactModal 
          onClose={() => setShowAddModal(false)}
          onSave={(contact: Omit<Contact, 'id' | 'contactType'>) => {
            api.addContact({ ...contact, contactType: activeContactType })
              .then((newContact: Contact) => 
                setContacts([...contacts, newContact])
              );
            setShowAddModal(false);
          }}
          groups={groups.filter(g => g.contactType === activeContactType)}
          contactType={activeContactType}
        />
      )}

      {editingContact && (
        <AddContactModal 
          onClose={() => setEditingContact(null)}
          onSave={(contact: Omit<Contact, 'id' | 'contactType'>) => {
            api.updateContact(editingContact.id, { ...contact, contactType: activeContactType })
              .then((updated: Contact) => {
                setContacts(contacts.map(c => 
                  c.id === editingContact.id ? updated : c
                ));
                setEditingContact(null);
              });
          }}
          groups={groups.filter(g => g.contactType === activeContactType)}
          contactType={activeContactType}
          initialData={editingContact}
        />
      )}

      {showAddGroupModal && (
        <AddGroupModal 
          onClose={() => {
            setShowAddGroupModal(false);
            setEditingGroup(null);
          }}
          onSave={(groupName: string) => {
            if (editingGroup) {
              api.updateGroup(editingGroup.name, { name: groupName, contactType: activeContactType })
                .then((updated: Group) => {
                  setGroups(groups.map(g => g.name === editingGroup.name ? updated : g));
                  setEditingGroup(null);
                });
            } else {
              const newGroup: Group = { name: groupName, contactType: activeContactType };
              api.addGroup(newGroup)
                .then((group: Group) => setGroups([...groups, group]));
            }
            setShowAddGroupModal(false);
          }}
          contactType={activeContactType}
          initialGroupName={editingGroup?.name}
        />
      )}
    </div>
    </div>
  );
};

export default ContactManagementSystem;