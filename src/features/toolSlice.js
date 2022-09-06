import { createSlice } from '@reduxjs/toolkit'

export const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    visibleId: 'all'
  },
  reducers: {
    show: (state,action) => {
      state.visibleId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { show } = toolSlice.actions

export default toolSlice.reducer
