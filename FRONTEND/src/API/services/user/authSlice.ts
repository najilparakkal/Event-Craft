import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRegister,login } from './userAuthService';

interface UserDetails {
  _id: string | null;
  name: string | null;
  email: string | null;
  phoneNum: string | null;
}

interface UserState {
  userDetails: UserDetails;
  jwt: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Function to retrieve stored user details from localStorage
const storedUserDetails: UserDetails | null = JSON.parse(localStorage.getItem('userDetails') || 'null');
const storedJWT: string | null = localStorage.getItem('jwt');

// Initialize initialState
const initialState: UserState = {
  userDetails: storedUserDetails ?? {
    _id: null,
    name: null,
    email: null,
    phoneNum: null,
  },
  jwt: storedJWT,
  status: 'idle',
  error: null,
};

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await userRegister('/user/signup', userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await login('/user/login', userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = {
          _id: action.payload.user.userDatas.id,
          name: action.payload.user.userDatas.name,
          email: action.payload.user.userDatas.email,
          phoneNum: action.payload.user.userDatas.phoneNum,
        };
        state.jwt = action.payload.user.token;
        localStorage.setItem('userDetails', JSON.stringify(state.userDetails));
        localStorage.setItem('jwt', state.jwt);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload,"///////////");
        
        state.userDetails = {
          _id: action.payload.userDetails?.id,
          name: action.payload.userDetails?.name,
          email: action.payload.userDetails?.email,
          phoneNum: action.payload.userDetails?.phoneNum,
        };
        state.jwt = action.payload.token;
        localStorage.setItem('userDetails', JSON.stringify(state.userDetails));
        if(state.jwt) {

          localStorage.setItem('jwt', state.jwt);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export reducer
export default userSlice.reducer;
