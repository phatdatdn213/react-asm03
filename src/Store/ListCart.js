import { createSlice } from "@reduxjs/toolkit";

const initialListCart = {
  content: [],
};

const ListCart = createSlice({
  name: "ListCart",
  initialState: initialListCart,
  reducers: {
    add_cart(state, action) {
      state.content = action.payload;
    },
    update_cart(state, action) {
      if (state.content.length !== 0) {
        let index = state.content.findIndex(
          (e) => e._id.$oid === action.payload.order
        );
        if (index !== -1) {
          state.content[index].amount = action.payload.value;
        }
      }
    },
    delete_cart(state, action) {
      let index = state.content.findIndex((e) => e._id.$oid === action.payload);
      state.content.splice(index, 1);
    },
  },
});

export default ListCart.reducer;
export const listCartActions = ListCart.actions;
