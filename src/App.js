import "./App.css";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/ShopPage/ShopPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import CartPage from "./Pages/CartPage/CartPage";
import SignoutPage from "./Pages/SignoutPage/SignoutPage";

function App() {
  return (
    <Fragment>
      <div className="layout">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<SignoutPage />}></Route>
          <Route path="/detail/:id" element={<DetailPage />}></Route>
        </Routes>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
