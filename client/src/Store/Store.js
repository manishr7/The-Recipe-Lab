import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../Reducers/UserReducer';
const store = configureStore({
  reducer: {
    Auth:UserReducer
  }, // Add your reducers here
});

export default store;
