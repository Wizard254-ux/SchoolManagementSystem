// src/components/SchoolAccount.tsx
import React, { useState, useEffect } from "react";
import { fetchSchoolAccount, updateSchoolAccount } from "./DummyData";
import { SchoolAccountInterface } from "./Types";

const SchoolAccount: React.FC = () => {
  const [account, setAccount] = useState<SchoolAccountInterface>({
    accountName: "",
    phoneNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const data = await fetchSchoolAccount();
        setAccount(data);
      } catch (error) {
        console.error("Error fetching school account:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAccount();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedAccount = await updateSchoolAccount(account);
      setAccount(updatedAccount);
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating school account:", error);
      alert("Failed to update account.");
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-md  mx-auto">
      <div className="flex justify-center mb-6">
        <div className="w-22 h-22 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-4xl text-white font-semibold">
            {account.accountName.charAt(0).toUpperCase()}
            {(account.accountName.split(" ")[1]?.charAt(0) || "").toUpperCase()}
          </span>
        </div>
      </div>
      <button className="block mx-auto text-[13px] mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
        Change Logo
      </button>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-[13px] font-medium text-gray-700">Account name</label>
          <input
            type="text"
            name="accountName"
            value={account.accountName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-700">Phone number</label>
          <input
            type="text"
            name="phoneNumber"
            value={account.phoneNumber}
            onChange={handleChange}
            className="mt-1 w-full p-2 border text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-[13px]font-medium text-gray-700">Email address</label>
          <input
            type="email"
            name="email"
            value={account.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-[13px] text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SchoolAccount;