import { configureStore } from '@reduxjs/toolkit'
import { directorySlice } from './slices/appSlice'

const appStore=configureStore({
    reducer: {
        directory: directorySlice.reducer,
    },
})

export default appStore