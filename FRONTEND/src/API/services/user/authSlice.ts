import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userRegister, login } from "./userAuthService";
import Cookies from "js-cookie";

const storedUserDetails: UserDetails | null = JSON.parse(
  localStorage.getItem("userDetails") || "null"
);

const initialState: UserState = {
  userDetails: storedUserDetails ?? {
    _id: null,
    name: null,
    email: null,
    phoneNum: null,
  },
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await userRegister("/user/signup", userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await login("/user/login", userData);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const GoogleAuth = createAsyncThunk(
  "user/googleUser",
  async (userData: GoogleAuth, { rejectWithValue }) => {
    try {
      const response = await userRegister("/user/googleUser", userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const GoogleLogin = createAsyncThunk(
  "user/googleLogin",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await login("/user/googleLogin", userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userDetails = {
        _id: null,
        name: null,
        email: null,
        phoneNum: null,
        profilePicture:null
      };
      state.status = "idle";
      state.error = null;
    },
    updateUserDetails(state, action: PayloadAction<Partial<UserDetails>>) {
      localStorage.removeItem("userDetails");
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
      localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = {
          _id: action.payload.user.userDatas.id,
          name: action.payload.user.userDatas.userName,
          email: action.payload.user.userDatas.email,
          phoneNum: action.payload.user.userDatas.phoneNum,
          profilePicture: action.payload.user.userDatas.profilePicture,
        };
        localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
          if (action.payload.token) Cookies.set("jwt", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          console.log(action.payload)
          state.status = "succeeded";
          state.userDetails = {
            _id: action.payload.userDetails?.id,
            name: action.payload.userDetails?.userName,
            email: action.payload.userDetails?.email,
            phoneNum: action.payload.userDetails?.phoneNum,
            profilePicture: action.payload.userDetails?.profilePicture,
          };
          localStorage.setItem(
            "userDetails",
            JSON.stringify(state.userDetails)
          );
          if (action.payload.token) Cookies.set("jwt", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(GoogleAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GoogleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = {
          _id: action.payload.response.userDatas.id,
          name: action.payload.response.userDatas.userName,
          email: action.payload.response.userDatas.email,
          phoneNum: action.payload.response.userDatas.phoneNum,
          profilePicture: action.payload.response.userDatas.profilePicture,
        };
        localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
        if (action.payload.token) Cookies.set("jwt", action.payload.token);
      })
      .addCase(GoogleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(GoogleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GoogleLogin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = "succeeded";
        state.userDetails = {
          _id: action.payload.userDetails?.id,
          name: action.payload.userDetails?.userName,
          email: action.payload.userDetails?.email,
          phoneNum: action.payload.userDetails?.phoneNum,
          profilePicture: action.payload.userDetails?.profilePicture,
        };
        localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
        if (action.payload.token) Cookies.set("jwt", action.payload.token);

      })
      .addCase(GoogleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout,updateUserDetails } = userSlice.actions;
export default userSlice.reducer;