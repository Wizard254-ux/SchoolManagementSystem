const API_BASE_URL = 'http://your-api-endpoint.com/api';

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
  contactType: 'Students' | 'Teachers' | 'Non Teaching Staff';
}

// Helper function to generate unique IDs
const generateId = (type: 'Students' | 'Teachers' | 'Non Teaching Staff'): string => {
  const prefix = type === 'Students' ? 'st' : type === 'Teachers' ? 'tch' : 'nts';
  return `${prefix}${Math.floor(Math.random() * 900000) + 100000}`;
};

export const getContacts = async (): Promise<Contact[]> => {
  const response = await fetch(`${API_BASE_URL}/contacts`);
  return response.json();
};

export const getGroups = async (): Promise<Group[]> => {
  const response = await fetch(`${API_BASE_URL}/groups`);
  return response.json();
};

export const addContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  const newContact: Contact = {
    ...contact,
    id: generateId(contact.contactType)
  };
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newContact)
  });
  return response.json();
};

export const updateContact = async (id: string, contact: Omit<Contact, 'id'>): Promise<Contact> => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  return response.json();
};

export const deleteContact = async (id: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE'
  });
};

export const addGroup = async (group: Group): Promise<Group> => {
  const response = await fetch(`${API_BASE_URL}/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group)
  });
  return response.json();
};

// * @param oldName - The current name of the group
//  * @param group - Updated group data
//  * @returns Promise resolving to the updated Group object
//  */
export const updateGroup = async (oldName: string, group: Group): Promise<Group> => {
  const response = await fetch(`${API_BASE_URL}/groups/${oldName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group)
  });
  return response.json(); // Expected response: Group
};

/**
 * Deletes a group by name
 * @param groupName - The name of the group to delete
 * @returns Promise resolving when deletion is complete
 */
export const deleteGroup = async (groupName: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/groups/${groupName}`, {
    method: 'DELETE'
  }); // No response body expected
};