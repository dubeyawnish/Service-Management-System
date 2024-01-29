

import { createSlice } from '@reduxjs/toolkit'




const initialState = {
  userData:{},
  activechat: false,
 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state,action){
        state.userData=action.payload;
    },
    toggleActiveChat: (state, action) => {
      state.activechat = action.payload;
    },
 
  }
})

export const {setUserData,toggleActiveChat  } = userSlice.actions
export default userSlice.reducer