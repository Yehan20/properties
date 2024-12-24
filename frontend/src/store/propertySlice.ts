

import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {PropertiesState, Property, SearchParams} from '@/types/types'


const URL = 'http://localhost:3001/properties/'

export const getProperties = createAsyncThunk('properties',async()=>{

    const response = await axios.get(URL);

    const properties = response.data.properties;

    console.log(properties);
   
    return properties
})

export const createProperty = createAsyncThunk('properties/create',async(property:Property)=>{

     const newProperty = await axios.post(URL ,{
            ...property
      })
    
    return  newProperty.data.property;
})

export const searchProperties  =createAsyncThunk('properties/search',async(filters:SearchParams)=>{

    // remove params that are not filled 
    const cleanedFilters = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(filters).filter(([key, value]) => value !== '')
      );

     const query = new URLSearchParams(cleanedFilters).toString();

     const newProperties = await axios.get(`${URL}/search?${query}`)
   
     return newProperties.data.properties;

})

const propertyInitalState:PropertiesState = {
     status:'idle',
     properties:[],
     searchProperties:[],
}

const propertySlice = createSlice({
    name:'Property',
    initialState:propertyInitalState,
    reducers:{
      
    },
    extraReducers:builder=>{
        builder.addCase(getProperties.pending,(state)=>{
             state.status = 'pending'
        })
        .addCase(getProperties.fulfilled,(state,action)=>{
             state.status = 'success'
             state.properties = action.payload   
        })
        .addCase(getProperties.rejected,(state,action)=>{
             if(action.error.message){
               state.status = action.error.message
               state.properties = [] 
            }
        })


        .addCase(createProperty.pending,(state)=>{
            state.status='pending'
        })
        .addCase(createProperty.fulfilled,(state,action)=>{
          
            state.status='success'
            state.properties.unshift(action.payload);
         
        })
        .addCase(createProperty.rejected,(state,action)=>{
            state.status=action.error.message as string
        })


        .addCase(searchProperties.pending,(state)=>{
            state.status='pending'
        })
        .addCase(searchProperties.fulfilled,(state,action)=>{
             
            state.searchProperties = action.payload   
            state.status='success'
        })
        .addCase(searchProperties.rejected,(state,action)=>{
            state.status=action.error.message as string
            state.searchProperties= [];
        })


    }
})

export default propertySlice.reducer;
