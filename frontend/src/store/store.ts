
import { configureStore } from '@reduxjs/toolkit';
import propertySlice from '@/store/propertySlice'


// Create the store

const Store = configureStore({
    reducer:{
        Properties: propertySlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>; // Root state type
export type AppDispatch = typeof Store.dispatch; // Dispatch type

export default Store;
