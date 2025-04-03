// src/types/index.ts
export interface SchoolAccount {
    accountName: string;
    phoneNumber: string;
    email: string;
  }
  
  export interface PasswordChange {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }