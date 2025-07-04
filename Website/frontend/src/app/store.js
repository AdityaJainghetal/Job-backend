import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import  authReducer from './users/authSlice';
import employeReducer from './Employe/employeSlice';
import  jobSlice from "../app/job/jobslice"


export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    job: jobSlice, 
    employe: employeReducer
    
  },


});

