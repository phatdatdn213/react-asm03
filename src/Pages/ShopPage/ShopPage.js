import BannerTop from "../../Components/BannerTop/BannerTop";
import Middle from "../../Components/Middle/Middle";
import Navbar from "../../Components/Navbar/Navbar";

const ShopPage = () => {
  return (
    <div>
      <Navbar />
      <BannerTop left={"shop"} right={"shop"} />
      <Middle />
    </div>
  );
};

export default ShopPage;
