import { createSlice } from '@reduxjs/toolkit'

export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    visibleId: 'all'
  },
  reducers: {
    showAll: (state) => {
      state.visibleId = 'all'
    },
    showOne: (state,action) => {
      state.visibleId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { showAll, showOne } = toolSlice.actions

export default toolSlice.reducer
