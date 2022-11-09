import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./PopupStore";
import listShopReducer from "./ListShopStore";
import loginReducer from "./LoginStatus";
import listCartReducer from "./ListCart";

const Store = configureStore({
  reducer: {
    popup: popupReducer,
    listShop: listShopReducer,
    login: loginReducer,
    listCart: listCartReducer,
  },
});

export default Store;
