import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: [
    {
      id: '1',
      fullname: { firstname: 'John', lastname: 'Doe' },
      phoneNumber: 1234567890,
      email: 'john.doe@example.com',
      password: 'password123',
      otp: 1234,
      dob: '1990-01-01',
      age: 34,
      nationality: 'American',
      gender: 'Male',
      city: 'New York',
      address: '123 Elm Street',
      country: 'USA',
      timezone: 'GMT-5',
      pinCode: 10001,
      whatsappPhoneNumber: 1234567890,
      aboutYourself: 'Experienced teacher in mathematics.',
      criminalCourtCaseStatus: false,
      accessToken: null,
      refreshToken: null,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
  ],
  reducers: {
    addTeacher: (state, action) => {
      state.push(action.payload);
    },
    updateTeacher: (state, action) => {
      const index = state.findIndex((teacher) => teacher.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteTeacher: (state, action) => {
      return state.filter((teacher) => teacher.id !== action.payload);
    },
  },
});

export const { addTeacher, updateTeacher, deleteTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
