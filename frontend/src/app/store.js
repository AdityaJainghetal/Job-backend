import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import  authReducer from '../features/users/authSlice';


export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
  },


});

