import { useNavigate } from "react-router-dom";
import classes from "./Banner.module.css";
import banner from "../../Resource Assignment 03/banner1.jpg";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.frame}>
      <img src={banner} alt="banner" />
      <div className={classes.title}>
        <h3>NEW INSPIRATION 2020</h3>
        <h1>20% OFF ON NEW SEASON</h1>
        <button onClick={() => navigate("/shop")}>Browse collections</button>
      </div>
    </div>
  );
};

export default Banner;
