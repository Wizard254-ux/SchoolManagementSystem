// src/components/ChangePassword.tsx
import React, { useState } from "react";
import { Lock } from "lucide-react";
import { PasswordChange } from "./Types";
import { changePassword } from "./DummyData";

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState<PasswordChange>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await changePassword(formData);
      setMessage(response.message);
      if (response.success) {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred while changing the password.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto min-w-[50px] overflow-auto min-h-[50px]">
      <h2 className="text-[14px] font-semibold text-gray-800 mb-6">Change Password</h2>
      {message && (
        <div
          className={`mb-6 p-3 rounded-md text-sm ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-[3%]">
        <div>
          <label className="block text-[13px] font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 text-[13px] w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="mt-1 text-[13px] w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-[13px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;