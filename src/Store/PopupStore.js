import { createSlice } from "@reduxjs/toolkit";

const initialPopupState = {
  content: {},
  isShow: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {
    show_popup(state, action) {
      state.content = action.payload;
      state.isShow = true;
    },
    hide_popup(state) {
      state.isShow = false;
    },
  },
});

export default popupSlice.reducer;
export const popupActions = popupSlice.actions;
