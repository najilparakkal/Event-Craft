import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../API/services/user/authSlice";
import vendorReducer from "../API/services/vendor/aurhSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
