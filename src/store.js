import { configureStore } from '@reduxjs/toolkit'
import gulvvarmeReducer from './features/gulvvarmeSlice'
import toolReducer from './features/toolSlice'

export default configureStore({
  reducer: {
    gulvvarme: gulvvarmeReducer,
    tool: toolReducer,
  },
})
