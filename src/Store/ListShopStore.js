import { createSlice } from "@reduxjs/toolkit";

const initialListShopState = {
  content: [],
};

const ListShopSlice = createSlice({
  name: "ListShop",
  initialState: initialListShopState,
  reducers: {
    show_list(state, action) {
      state.content = action.payload;
    },
  },
});

export default ListShopSlice.reducer;
export const listShopActions = ListShopSlice.actions;
