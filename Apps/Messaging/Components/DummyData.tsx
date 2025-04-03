// src/api/dummyData.ts
import { SchoolAccountInterface, PasswordChange } from "./Types";

export const dummySchoolAccount: SchoolAccountInterface = {
  accountName: "Alpha Secondary",
  phoneNumber: "0113765336",
  email: "brianesa262@gmail.com",
};

export const fetchSchoolAccount = async (): Promise<SchoolAccountInterface> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummySchoolAccount), 500);
  });
};

export const updateSchoolAccount = async (
  data: SchoolAccountInterface
): Promise<SchoolAccountInterface> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};

export const changePassword = async (
  data: PasswordChange
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.newPassword !== data.confirmNewPassword) {
        resolve({ success: false, message: "New passwords do not match" });
      } else if (data.currentPassword !== "current123") {
        resolve({ success: false, message: "Current password is incorrect" });
      } else {
        resolve({ success: true, message: "Password changed successfully" });
      }
    }, 500);
  });
};