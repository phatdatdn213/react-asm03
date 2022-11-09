import { createSlice } from "@reduxjs/toolkit";

const initialLoginStatus = {
  content: {},
  isLogin: false,
};

const LoginSlice = createSlice({
  name: "LoginStatus",
  initialState: initialLoginStatus,
  reducers: {
    on_login(state, action) {
      state.content = action.payload;
      state.isLogin = true;
    },
    on_logout(state) {
      state.isLogin = false;
    },
  },
});

export default LoginSlice.reducer;
export const loginActions = LoginSlice.actions;
