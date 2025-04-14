import React, { JSX, useState, useRef } from 'react';
import { Paperclip, Link, Image, HelpCircle, Send, Clock } from 'lucide-react';
import Menu from './Components/Menu'
import MessagesFooter from './Components/MessagesFooter';
import Calender from './Components/Calender';
import NavBar from './Components/NavBar';
import ContactSelector from './Components/ContactSelector'
import ContactInputs from './Components/ContactInputs.'
import { sendMessage } from './Components/Api';
import { BackendMessage } from './Components/Api';

type MessageType = 'regular' | 'exam' | 'fee';

interface FileObject {
  file: File;
  type: 'file' | 'image' | 'link';
}


const Message = (): JSX.Element => {
  const [messageType, setMessageType] = useState<MessageType>('regular');
  const [messageText, setMessageText] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [recipients, setRecipients] = useState<string>('');
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [isScheduled, setScheduled] = useState<boolean>(false);
  const [timeStamp, setTimeStamp] = useState<string>('');
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  
  // File upload states
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const linkInputRef = useRef<HTMLInputElement | null>(null);
  const [updatedMessage,setUpdatedMessage]=useState<BackendMessage[]|null>(null)


  const handleRecipient = (value: string) => {
    console.log(recipients, 'the recipients')
    setRecipients(value)
  }

  const handleCalender = (showState: boolean) => {
    setShowCalender(showState)
  }
  
  const handleTimeStamp = (tmeStamp: string) => {
    setTimeStamp(tmeStamp)
    setScheduled(true)
    console.log(timeStamp)
  }

  const handleContactSelection = (numbers: string[]) => {
    console.log(numbers)
    setSelectedNumbers(numbers);
    let recipientList = recipients.split(',').filter((n) => n.trim() !== '')
    const updatedRecipients = [...recipientList, ...numbers];
    setContacts(updatedRecipients)
    console.log(updatedRecipients.join(','), 'joined recipinets ')
  };

  // File handling functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        type
      }));
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const handleLinkSubmit = async () => {
    if (!linkInputRef.current || !linkInputRef.current.value) return;
    
    const url = linkInputRef.current.value.trim();
    if (!url) {
      setUploadStatus("Please enter a valid URL");
      return;
    }
    setLink(url)

    // Here you would typically handle the link, possibly send it to your backend
    // For now, we'll just add it to the list of attachments
    setUploadStatus("Link added successfully");
    linkInputRef.current.value = '';
    
    // Close the link input container
    document.getElementById('link-input-container')?.classList.add('hidden');
  };

  const handleSendMessage = async () => {
    if (selectedFiles.length === 0 && !messageText) {
      setUploadStatus("No content to send");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Sending message...");

    try {
      const formData = new FormData();
      if (link) {
        formData.append('link', link);

      }
      // Add message data and metadata
      formData.append('messageType', messageType);
      formData.append('messageText', messageText);
      formData.append('recipients', recipients);
      formData.append('isScheduled', isScheduled.toString());
      formData.append('timestamp', timeStamp || new Date().toISOString());
      
      // Add selected contacts
      contacts.forEach((contact, index) => {
        formData.append(`contact-${index}`, contact);
      });
      
      // Add files
      if(selectedFiles.length!==0){
        selectedFiles.forEach((fileObj, index) => {
          formData.append(`file-${index}`, fileObj.file);
          // formData.append(`fileType-${index}`, fileObj.type);
        });

      }

      for(let [key,value] of formData.entries()){
        console.log(key,'hello',value)
      }

      // Send to backend
      const response = await sendMessage(formData)
      setUploadStatus(`Message sent successfully: ${response.message}`);
      setUpdatedMessage(response.data)
      // Clear form after successful send
      setMessageText('');
      setSelectedFiles([]);
    } catch (error: any) {
      setUploadStatus(`Failed to send message: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const activateFileInput = () => fileInputRef.current?.click();
  const activateImageInput = () => imageInputRef.current?.click();
  const activateLinkInput = () => {
    document.getElementById('link-input-container')?.classList.toggle('hidden');
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  function formatISOToReadableDate(isoString: string): string {
    const date = new Date(isoString);
  
    // Format it for Kenya (East Africa Time)
    return date.toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
  

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <NavBar 
        username="AlphaX"
      />
      <ContactSelector 
        isOpen={isSelectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelectContacts={handleContactSelection}
      />
      {/* Left Sidebar */}
      <div className="flex-1 h-[80vh] overflow-clip flex flex-row bg-gray-100">
        <Menu />
        <Calender showCalender={showCalender} setShowCalender={handleCalender}  handleTimeStamp={handleTimeStamp}/>
        {/* Main Content */}
        <div className="flex-1 min-w-[20rem] flex h-screen overflow-auto flex-col">
          {/* Header */}
          <div className="bg-white  h-[2.5rem] sm:h-fit border-b border-w-1 mb-2 border-gray-300 p-4 ">
            <h1 className="text-gray-500 text-[13px] sm:text-[14px] font-medium">MESSAGES</h1>
          </div>
          
          {/* Message Content */}
          <div className="flex-1 ">
            <div className="bg-white rounded-md shadow-sm p-4">
              <div className="mb-4">
                <h2 className="font-medium mb-2 text-[13px] md:text-[14px]">What do you like to send today?</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="messageType" 
                      value="regular" 
                      checked={messageType === 'regular'} 
                      onChange={() => setMessageType('regular')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className='text-[13px] md:text-[14px]'>Regular message</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="messageType" 
                      value="exam" 
                      checked={messageType === 'exam'} 
                      onChange={() => setMessageType('exam')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className='text-[13px] md:text-[14px]'>Exam results</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="messageType" 
                      value="fee" 
                      checked={messageType === 'fee'} 
                      onChange={() => setMessageType('fee')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className='text-[13px] md:text-[14px]' >Fee balances</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2 text-[13px]">Recipients</label>
                <div className="flex items-center gap-2">
                  <ContactInputs
                    contacts={contacts}
                    setContacts={setContacts}
                    value={recipients}
                    onChange={(value: string) => handleRecipient(value)}
                    placeholder="Enter phone numbers..."
                  />
                  <button onClick={() => setSelectorOpen(true)} className="text-blue-500 text-sm text-[13px]">Add from contacts</button>
                </div>
              </div>
              
              <div className="mb-4">
                <textarea 
                  className="border border-w-2 border-gray-300 rounded-md p-2 w-full text-[12px] h-48 resize-none"
                  placeholder="Write your message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
              
              {/* Attachments section */}
              <div className="mb-4">
                <div className="text-gray-500 mb-2 text-[12px]">ADD ATTACHMENTS</div>
                <div className="flex gap-4">
                  <button 
                    onClick={activateFileInput}
                    className="flex flex-col items-center text-gray-500 text-xs"
                    disabled={isUploading}
                  >
                    <div className="p-2 border rounded-md mb-1 hover:bg-gray-100">
                      <Paperclip size={16} />
                    </div>
                    Files
                  </button>
                  <button 
                    onClick={activateLinkInput}
                    className="flex flex-col items-center text-gray-500 text-xs"
                    disabled={isUploading}
                  >
                    <div className="p-2 border rounded-md mb-1 hover:bg-gray-100">
                      <Link size={16} />
                    </div>
                    Link
                  </button>
                  <button 
                    onClick={activateImageInput}
                    className="flex flex-col items-center text-gray-500 text-xs"
                    disabled={isUploading}
                  >
                    <div className="p-2 border rounded-md mb-1 hover:bg-gray-100">
                      <Image size={16} />
                    </div>
                    Photos
                  </button>
                </div>

                {/* Hidden file inputs */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => handleFileChange(e, 'file')} 
                  className="hidden" 
                  multiple 
                />
                
                <input 
                  type="file" 
                  ref={imageInputRef} 
                  onChange={(e) => handleFileChange(e, 'image')} 
                  className="hidden" 
                  accept="image/*" 
                  multiple 
                />

                {/* Link input container (hidden by default) */}
                <div id="link-input-container" className="hidden mt-4">
                  <div className="flex">
                    <input 
                      type="url"
                      ref={linkInputRef}
                      placeholder="Enter URL"
                      className="flex-grow border rounded-md p-2 mr-2 text-sm" 
                    />
                    <button 
                      onClick={handleLinkSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
                      disabled={isUploading}
                    >
                      Add Link
                    </button>
                  </div>
                </div>

                {isScheduled&&
                <div className='w-full text-sm font-medium mb-2'>
                  Schedule <br/>
                 <span className='w-full mt-2 flex justify-between font-medium text-xs text-gray-600'>{`Message Scheduled for     ${formatISOToReadableDate(timeStamp)}`} 
                   <button 
                            onClick={()=>setScheduled(false)}
                            className="text-red-500 text-xs hover:text-red-700"
                          >
                            Remove
                          </button></span> 
                </div>
                }

                {/* Selected files display */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Attachments ({selectedFiles.length})</div>
                    <ul className="text-xs text-gray-600">
                      {selectedFiles.map((fileObj, index) => (
                        <li key={index} className="mb-1 flex justify-between items-center">
                          <span>
                            {fileObj.file.name} ({(fileObj.file.size / 1024).toFixed(1)} KB)
                          </span>
                          <button 
                            onClick={() => removeFile(index)}
                            className="text-red-500 text-xs hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Status message */}
                {uploadStatus && (
                  <div className={`text-sm mt-2 ${uploadStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                    {uploadStatus}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className='text-[13px]'>1 pages ({messageText.length} characters)</span>
                  <span className='text-[13px]'>Units consumed: {Math.ceil(messageText.length / 160) || 0}</span>
                  <HelpCircle size={16} className="text-blue-500" />
                </div>
                <div className="flex mt-3 md:mt-0 gap-3 md:gap-2">
                  <button 
                    onClick={handleSendMessage}
                    disabled={isUploading}
                    className={`${isUploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 md:px-6 md:py-2 rounded-md flex items-center text-[12px] md:text-[13px]`}
                  >
                    <Send size={16} className="mr-2" />
                    {isUploading ? 'Sending...' : 'Send'}
                  </button>
                  <button 
                    onClick={() => setShowCalender(true)} 
                    className="bg-gray-100 text-[13px] hover:bg-blue-100 transition duration-200 text-gray-700 px-3 md:px-6 md:py-2 rounded-md flex items-center"
                  >
                    <Clock size={16} className="mr-2" />
                    Schedule
                  </button>
                  <button className="text-blue-500 text-[14px] hover:text-black text-sm">
                    Message Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
          <MessagesFooter
          updatedMessage={updatedMessage}
          setUpdatedMessage={setUpdatedMessage}
          
          />
        </div>
      </div>
    </div>
  );
};

export default Message;