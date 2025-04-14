import axios from 'axios';
// import { getGlobalLogout } from './AuthProvider';
// import { School } from 'lucide-react';
export const api = axios.create({
//   baseURL: 'https://lmsbackendexpress.onrender.com/',
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors remain mostly the same, but remove manual token handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export const Login=async(email:string,password:string):Promise<{username:string;email:string}>=>{
    try {
      const response = await api.post('/auth/login', { password, email });
      console.log('response',response.data);
      return response.data
      // getGlobalLogout();
      // setAuth(response.data);

    } catch (error) {
      console.error(error);
      throw error;
    }
}

export const AuthEmail=async(email:string):Promise<{verified:boolean}>=>{
    try {
      const response = await api.post('/auth/email', { emailCode:email });
      console.log(response.data);
      return response.data
      // getGlobalLogout();
      // setAuth(response.data);

    } catch (error) {
      console.error(error);
      throw error;
    }
}
export const resendCode=async():Promise<{verified:boolean}>=>{
    try {
      const response = await api.get('/auth/email/?resendCode=true');
      console.log(response.data);
      return response.data
      // getGlobalLogout();
      // setAuth(response.data);

    } catch (error) {
      console.error(error);
      throw error;
    }
}

export const createUser=async(username:string,email:string,password:string):Promise<{username:string;email:string}>=>{
    try {
      const response = await api.post('/auth/create', { username, email ,password});
      console.log(response.data);
      return response.data
      // getGlobalLogout();
      // setAuth(response.data);

    } catch (error) {
      console.error(error);
      throw error;
    }
}
export const createSchoolAccount=async(schoolName:string,phoneNumber:string,institutionType:string):Promise<{AccountCreated:boolean;}>=>{
    try {
      const response = await api.post('/school/account', { schoolName, phoneNumber ,institutionType});
      console.log(response.data);
      return response.data
      // getGlobalLogout();
      // setAuth(response.data);

    } catch (error) {
      console.error(error);
      throw error;
    }
}
export const checkSchoolAccount=async():Promise<{AccountAvailable:boolean;}>=>{
    try {
      const response = await api.get('/school/account/?checkAccount=true');
      console.log(response.data);
      return response.data

    } catch (error) {
      console.error(error);
      throw error;
    }
}

