import { ChangeEvent, useState } from 'react';
import { School, Phone, Building, X } from 'lucide-react';
import { createSchoolAccount } from '../Api';
import { RequestStatusComponent,RequestStatus } from './RequestStatusComponent';

interface schoolAccount{
    handleSchoolOverlay:(param:boolean)=>void;
    setHasAccount: (value:boolean|((prev:boolean)=>boolean))=>void;

}
export default function SchoolAccountOverlay({handleSchoolOverlay,setHasAccount}:schoolAccount) {
  const [formData, setFormData] = useState({
    schoolName: '',
    phoneNumber: '',
    institutionType: ''
  });
  const [responseOutput, setResponseOutput] = useState<{message:string,status:RequestStatus}>({
    message: "",
    status: "idle",
  });
  const handleClose = () => handleSchoolOverlay(false);

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e:ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try{
        const res=await createSchoolAccount(formData.schoolName,formData.phoneNumber,formData.institutionType)
        console.log(res)
        localStorage.setItem('hasAccount',true.toString())
        setHasAccount(true)
    }catch(error:any){
        if(!error.status){
            console.log('network error')
            setResponseOutput({
                message: 'Network error ,check your internet connection',
                status: "error",
            })
        }else{

            setResponseOutput({
                message: error.response.data.message,
                status: "error",
            })
            console.log(error.response.data.message)
        }
    }
    // Here you would handle the form submission to your backend
    handleClose();
  };

  return (
    <div className="relative">
      {/* Button to trigger the overlay */}
      {responseOutput.message && <RequestStatusComponent  status={responseOutput.status} message={responseOutput.message}/>}

        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Create School Account</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* School Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <School className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Enter school name"
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Institution Type Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution Type</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="institutionType"
                      value={formData.institutionType}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                    >
                      <option value="" disabled>Select institution type</option>
                      <option value="primary">Primary School</option>
                      <option value="secondary">Secondary School</option>
                      <option value="college">College</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!formData.institutionType||!formData.phoneNumber||!formData.schoolName}
                    className={`w-full   text-black font-medium py-2 px-4 rounded-md transition-colors ${formData.institutionType==''||formData.phoneNumber==''||formData.schoolName=='' ? 'bg-amber-700':'bg-yellow-500 hover:bg-yellow-600'}`}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  );
}