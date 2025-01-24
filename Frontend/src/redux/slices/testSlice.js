import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: [
    {
      id: '1',
      teacher: 'teacherId123',
      testType: 'Test1',
      isChecked: false,
      testName: 'Mathematics Test',
      testDate: '2024-12-20',
    },
    {
      id: '2',
      teacher: 'teacherId456',
      testType: 'Test2',
      isChecked: true,
      testName: 'Science Test',
      testDate: '2024-12-22',
    },
    {
      id: '3',
      teacher: 'teacherId789',
      testType: 'Terms and condition',
      isChecked: false,
      testName: 'English Test',
      testDate: '2024-12-24',
    },
  ],
  reducers: {
    addTest: (state, action) => {
      state.push(action.payload);
    },
    updateTest: (state, action) => {
      const index = state.findIndex((test) => test.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteTest: (state, action) => {
      return state.filter((test) => test.id !== action.payload);
    },
  },
});

export const { addTest, updateTest, deleteTest } = testSlice.actions;
export default testSlice.reducer;
