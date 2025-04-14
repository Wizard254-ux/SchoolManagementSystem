import { Contact } from '../Contact';
const API_BASE_URL = 'http://your-api-endpoint.com/api';
import { api } from '../../../src/Api';

interface Group {
  name: string;
  contactType: 'Students' | 'Teachers' | 'Non Teaching Staff';
}

export interface BackendMessage {
  id: string;
  recipients: string[];
  textMessage: string;
  status: string; // e.g., "Failed", "Sent", "Pending"
  createdAt: string; // ISO date string
  scheduledDate:string;
}

// Helper function to generate unique IDs
const generateId = (type: 'Students' | 'Teachers' | 'Non Teaching Staff'): string => {
  const prefix = type === 'Students' ? 'st' : type === 'Teachers' ? 'tch' : 'nts';
  return `${prefix}${Math.floor(Math.random() * 900000) + 100000}`;
};

export const getContacts = async (): Promise<Contact[]> => {
  try{
  
    const response = await api.get(`/contacts/all`)
    console.log('response',response.data)
    return response.data
  }catch(erorr:any){
    console.log(erorr)
    throw erorr
  }
};

export const getGroups = async (): Promise<Group[]> => {
  try{
    const response = await api.get('/contacts/groups')
    console.log(response.data)
    return response.data
  }catch(error:any){
    throw error
  }
};

export const addContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
 try{

  const newContact: Contact = {
    ...contact,
    id: generateId(contact.contactType)
  };
  console.log(newContact)

  const response = await api.post(`/contacts/new`,newContact)
  console.log('response',response.data)
  return response.data
}catch(erorr:any){
  console.log(erorr)
  throw erorr
}
};

export const updateContact = async (id: string, contact: Omit<Contact, 'id'>): Promise<Contact> => {
  try{
  const response = await api.put(`/contacts/all`,contact)
  console.log('response',response.data)
  return response.data
}catch(erorr:any){
  console.log(erorr)
  throw erorr
}
};

export const deleteContact = async (id: string): Promise<void> => {
  try{
    const response = await api.delete(`/contacts/all/?id=${id}`)
    console.log('response',response.data)
    return response.data
  }catch(erorr:any){
    console.log(erorr)
    throw erorr
}};

export const addGroup = async (group: Group): Promise<Group> => {
  try{

    const response = await api.post('/contacts/groups', group)
    return response.data
  }catch(error:any){
    throw error
  }
};


export const updateGroup = async (oldName: string, group: Group): Promise<Group> => {
  console.log(group)
  try{
    const response = await api.put(`/contacts/groups/?oldName=${oldName}`, group)
    return response.data
  }catch(error:any){
    throw error
  }
};

export const deleteGroup = async (groupName: string): Promise<void> => {
  try{
    const response = await api.delete(`/contacts/groups/?groupName=${groupName}`)
    return response.data
  }catch(error:any){
    throw error
  }
};

export const sendMessage = async (formData: any):Promise<{message:string,data:BackendMessage[]}> => {
  try{
    const response = await api.post(`/messages/instant`,formData,{
      withCredentials: true, 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
    })
    return response.data
  }catch(error:any){
    console.log(error.response)
    throw error
  }
};
export const resendFailedMsgs = async (data: string[]):Promise<{message:string}> => {
  console.log('databeing sent ',data)
  try{
    const response = await api.post(`/messages/Fails`,data,{
      withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
    })
    return response.data
  }catch(error:any){
    console.log(error.response)
    throw error
  }
};
export const deleteMessages = async (dataIds: string[]):Promise<{message:string}> => {
  try{
    const response = await api.delete(`/messages/instant/?dataIds=${dataIds}`,{
      withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
    })
    return response.data
  }catch(error:any){
    console.log(error.response)
    throw error
  }
};