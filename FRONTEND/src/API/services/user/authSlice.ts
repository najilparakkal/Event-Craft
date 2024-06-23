import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRegister, login } from './userAuthService';

const storedUserDetails: UserDetails | null = JSON.parse(localStorage.getItem('userDetails') || 'null');
const storedJWT: string | null = localStorage.getItem('jwt');

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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

export const GoogleAuth = createAsyncThunk(
  'user/googleUser',
  async (userData: GoogleAuth, { rejectWithValue }) => {
    try {
      const response = await userRegister('/user/googleUser', userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const GoogleLogin = createAsyncThunk(
  'user/googleLogin',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await login('/user/googleLogin', userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userDetails = {
        _id: null,
        name: null,
        email: null,
        phoneNum: null,
      };
      state.jwt = null;
      state.status = 'idle';
      state.error = null;
    },
  },
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
        state.userDetails = {
          _id: action.payload.userDetails?.id,
          name: action.payload.userDetails?.name,
          email: action.payload.userDetails?.email,
          phoneNum: action.payload.userDetails?.phoneNum,
        };
        state.jwt = action.payload.token ?? null;
        localStorage.setItem('userDetails', JSON.stringify(state.userDetails));
        if (state.jwt) {
          localStorage.setItem('jwt', state.jwt);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(GoogleAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(GoogleAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = {
          _id: action.payload.response.userDatas.id,
          name: action.payload.response.userDatas.name,
          email: action.payload.response.userDatas.email,
          phoneNum: action.payload.response.userDatas.phoneNum,
        };
        state.jwt = action.payload.response.token;
        localStorage.setItem('userDetails', JSON.stringify(state.userDetails));
        if (state.jwt) {
          localStorage.setItem('jwt', state.jwt);
        }
      })
      .addCase(GoogleAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(GoogleLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GoogleLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = {
          _id: action.payload.userDetails?.id,
          name: action.payload.userDetails?.name,
          email: action.payload.userDetails?.email,
          phoneNum: action.payload.userDetails?.phoneNum,
        };
        state.jwt = action.payload.token ?? null;
        localStorage.setItem('userDetails', JSON.stringify(state.userDetails));
        if (state.jwt) {
          localStorage.setItem('jwt', state.jwt);
        }
      })
      .addCase(GoogleLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
