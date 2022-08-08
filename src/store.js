import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import gulvvarmeReducer from './features/gulvvarmeSlice'
import toolReducer from './features/toolSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    gulvvarme: gulvvarmeReducer,
    tool: toolReducer,
  },
})
