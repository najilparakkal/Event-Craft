import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, vendorRegister } from "./vendorAuthService";
import Cookies from "js-cookie";
const storedVendorDetails: vendorDetails | null = JSON.parse(
  localStorage.getItem("vendorDetails") || "null"
);

const initialState: vendorState = {
  vendorDetails: storedVendorDetails ?? {
    _id: null,
    name: null,
    email: null,
    phoneNum: null,
  },
  jwt: null,
  status: "idle",
  error: null,
};

export const signupVendor = createAsyncThunk(
  "vendor/signup",
  async (vendorData: any, { rejectWithValue }) => {
    try {
      const response = await vendorRegister("/vendor/signup", vendorData);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const vendorLogin = createAsyncThunk(
  "vendor/login",
  async (vendorData: any, { rejectWithValue }) => {
    try {
      const response = await login("/vendor/login", vendorData);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const GoogleAuth = createAsyncThunk(
  "vendor/googlesignup",
  async (vendorData: GoogleAuth, { rejectWithValue }) => {
    try {
      const response = await vendorRegister("/vendor/googlesignup", vendorData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const GoogleLogin = createAsyncThunk(
  "vendeor/googleLogin",
  async (vendeorData: any, { rejectWithValue }) => {
    try {
      const response = await login("/vendor/googleLogin", vendeorData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    logout(state) {
      state.vendorDetails = {
        _id: null,
        name: null,
        email: null,
        phoneNum: null,
        profilePicture: null,
      };
      state.jwt = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorDetails = {
          _id: action.payload.response.vendorDetails.id,
          name: action.payload.response.vendorDetails.vendorName,
          email: action.payload.response.vendorDetails.email,
          phoneNum: action.payload.response.vendorDetails.phoneNum,
          profilePicture: action.payload.response.vendorDetails?.profilePicture,
        };
        state.jwt = action.payload.response.token;
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(state.vendorDetails)
        );
        if (state.jwt) Cookies.set("jwt", state.jwt);
      })
      .addCase(signupVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(vendorLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(vendorLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorDetails = {
          _id: action.payload.vendorDetails?.id,
          name: action.payload.vendorDetails?.vendorName,
          email: action.payload.vendorDetails?.email,
          phoneNum: action.payload.vendorDetails?.phoneNum,
          profilePicture: action.payload.vendorDetails?.profilePicture,
        };
        state.jwt = action.payload.token ?? null;
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(state.vendorDetails)
        );
        if (state.jwt) {
          Cookies.set("jwt", state.jwt);
        }
      })
      .addCase(vendorLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(GoogleAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GoogleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorDetails = {
          _id: action.payload.response.vendorDetails.id,
          name: action.payload.response.vendorDetails.vendorName,
          email: action.payload.response.vendorDetails.email,
          phoneNum: action.payload.response.vendorDetails.phoneNum,
        };
        state.jwt = action.payload.response.token;
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(state.vendorDetails)
        );
        if (state.jwt) {
          Cookies.set("jwt", state.jwt);
        }
      })
      .addCase(GoogleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(GoogleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GoogleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorDetails = {
          _id: action.payload.vendorDetails?.id,
          name: action.payload.vendorDetails?.vendorName,
          email: action.payload.vendorDetails?.email,
          phoneNum: action.payload.vendorDetails?.phoneNum,
          profilePicture: action.payload.vendorDetails?.profilePicture,
        };
        state.jwt = action.payload.token ?? null;
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(state.vendorDetails)
        );
        if (state.jwt) {
          Cookies.set("jwt", state.jwt);
        }
      })
      .addCase(GoogleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = vendorSlice.actions;
export default vendorSlice.reducer;
