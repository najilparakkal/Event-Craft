import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login, vendorRegister } from "./vendorAuthService";
import Cookies from "js-cookie";
import { IvendorDetails, IvendorState } from "./interfaces";
import { authAxiosInstance } from "./axios/AxiosInstance";
const storedVendorDetails: IvendorDetails | null = JSON.parse(
  localStorage.getItem("vendorDetails") || "null"
);

const initialState: IvendorState = {
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
      state.status = "idle";
      state.error = null;
    },
    updateVendorDetails(state, action: PayloadAction<Partial<IvendorDetails>>) {
      localStorage.removeItem("vendorDetails");
      state.vendorDetails = {
        ...state.vendorDetails,
        ...action.payload,
      };
      localStorage.setItem(
        "vendorDetails",
        JSON.stringify(state.vendorDetails)
      );
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
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(state.vendorDetails)
        );
        if (action.payload.token) {
          Cookies.set("jwt", action.payload.token);
          authAxiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = "Bearer " + action.payload.token;
            return config;
          });
        }
      })
      .addCase(signupVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(vendorLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        vendorLogin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.vendorDetails = {
            _id: action.payload.vendorDetails?.id,
            name: action.payload.vendorDetails?.vendorName,
            email: action.payload.vendorDetails?.email,
            phoneNum: action.payload.vendorDetails?.phoneNum,
            profilePicture: action.payload.vendorDetails?.profilePicture,
          };
          localStorage.setItem(
            "vendorDetails",
            JSON.stringify(state.vendorDetails)
          );
          if (action.payload.token) {
            Cookies.set("jwt", action.payload.token);
            authAxiosInstance.interceptors.request.use((config) => {
              config.headers.Authorization = "Bearer " + action.payload.token;
              return config;
            });
          }
        }
      )
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
        localStorage.setItem(
          "vendorDetails",
          JSON.stringify(state.vendorDetails)
        );
        if (action.payload.token) {
          Cookies.set("jwt", action.payload.token);
          authAxiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = "Bearer " + action.payload.token;
            return config;
          });
        }
      })
      .addCase(GoogleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(GoogleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        GoogleLogin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.vendorDetails = {
            _id: action.payload.vendorDetails?.id,
            name: action.payload.vendorDetails?.vendorName,
            email: action.payload.vendorDetails?.email,
            phoneNum: action.payload.vendorDetails?.phoneNum,
            profilePicture: action.payload.vendorDetails?.profilePicture,
          };
          localStorage.setItem(
            "vendorDetails",
            JSON.stringify(state.vendorDetails)
          );
          if (action.payload.token) {
            Cookies.set("jwt", action.payload.token);
            authAxiosInstance.interceptors.request.use((config) => {
              config.headers.Authorization = "Bearer " + action.payload.token;
              return config;
            });
          }
        }
      )
      .addCase(GoogleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateVendorDetails } = vendorSlice.actions;
export default vendorSlice.reducer;
