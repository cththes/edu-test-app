import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  
}

const initialState: TestState = {
  
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    
  },
});

export const {  } = testSlice.actions;

export default testSlice.reducer;