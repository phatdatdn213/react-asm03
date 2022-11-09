import classes from "./Middle.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listShopActions } from "../../Store/ListShopStore";
import useData from "../Data/Data";
import Imgs from "../Data/Imgs";

const Middle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  let listDetail = useSelector((state) => state.listShop.content);

  const getData = (e) => {
    setData(e);
    dispatch(listShopActions.show_list(e));
  };

  useData(getData);

  const getId = (e) => {
    const chosen = e.target.id;
    navigate(`/detail/${chosen}`);
  };

  const getTitle = (e) => {
    console.log(e.target.textContent);
    let title = e.target.textContent.toLowerCase();

    if (title === "all") {
      dispatch(listShopActions.show_list(data));
      return;
    }
    let array = data.filter((items) => items.category === title);
    if (array.length !== 0) {
      dispatch(listShopActions.show_list(array));
    } else {
      dispatch(listShopActions.show_list([]));
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.left} onClick={getTitle}>
        <h2>CATEGORIES</h2>
        <h4 style={{ backgroundColor: "black", color: "white" }}>APPLE</h4>
        <p>All</p>
        <h4>IPHONE & MAC</h4>
        <p>IPhone</p>
        <p>Ipad</p>
        <p>Macbook</p>
        <h4>WIRELESS</h4>
        <p>Airpod</p>
        <p>Watch</p>
        <h4>OTHER</h4>
        <p>Mouse</p>
        <p>Keyboard</p>
        <p>Other</p>
      </div>
      <div className={classes.right}>
        <div className={classes.rightCol}>
          {listDetail.map((e) => {
            return (
              <div key={e._id.$oid} className={classes.box} onClick={getId}>
                <Imgs
                  img1={e.img1}
                  name={e.name}
                  price={e.price}
                  id={e._id.$oid}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Middle;
