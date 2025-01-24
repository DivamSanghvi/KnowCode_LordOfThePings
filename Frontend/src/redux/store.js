import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from './slices/teacherSlice'
import testReducer from './slices/testSlice'
import userReducer from "./slices/user.slice.js"
const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    test: testReducer,
    user: userReducer
  },
});

export default store;
