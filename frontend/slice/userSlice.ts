import { configureStore, createSlice } from "@reduxjs/toolkit";

 
const userSlice = createSlice({
    name: 'counter',
    initialState: { count: 0 },
    reducers: {
      loginUser: (state) => {
        state.count += 1;
      },
      decrement: (state) => {
        state.count -= 1;
      },
      isLoggedIn: (state) => {
        state.count = 0;
      }
    }
});

export const {increment , decrement , reset} =  userSlice.actions;
export const counterReducer = userSlice.reducer;


const store =  configureStore({
    reducer :{
       counter : counterReducer
    },
});

export default store;

// 2. Create a Redux store
// const store = createStoreHook(messageReducer);