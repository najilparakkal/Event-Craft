import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { userRegister } from './userAuthService';



export const signupUser = createAsyncThunk(endpoint,
    async(userData,{isRejectedWithValue})=>{
        try {
            const response = userRegister(endpoint)
            return response;
        } catch (error) {
            console.log(error);
            
        }
    }
)