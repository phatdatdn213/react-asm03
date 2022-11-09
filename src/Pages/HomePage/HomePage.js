import { Fragment } from "react";
import Banner from "../../Components/Banner/Banner";
import CategoriesList from "../../Components/CategoriesList/CategoriesList";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import OtherInfo from "../../Components/OtherInfo/OtherInfo";
import ProductsList from "../../Components/ProductsList/ProductsList";
import Popup from "../../Components/Popup/Popup";
import { useSelector } from "react-redux";
import { popupActions } from "../../Store/PopupStore";

const HomePage = () => {
  const show = useSelector((state) => state.popup.isShow);

  return (
    <Fragment>
      <Navbar />
      <Banner />
      <CategoriesList />
      <ProductsList />
      {show && <Popup />}
      <OtherInfo />
      <Footer />
    </Fragment>
  );
};

export default HomePage;
