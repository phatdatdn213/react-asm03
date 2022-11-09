import classes from "./ProductsList.module.css";
import { Fragment, useState } from "react";
import useData from "../Data/Data";
import { useDispatch } from "react-redux";
import Imgs from "../Data/Imgs";
import { popupActions } from "../../Store/PopupStore";

const ProductsList = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  const getAPI = (e) => {
    setList(e);
  };

  useData(getAPI);

  const getDetail = (e) => {
    const detail = e.target.parentNode.id;
    console.log(e.target.parentNode.id);
    const [chosen] = list.filter((e) => {
      return e._id.$oid === detail;
    });
    dispatch(popupActions.show_popup(chosen));
  };

  const tam = list.map((e) => {
    return (
      <div
        key={e._id.$oid}
        id={e._id.$oid}
        onClick={getDetail}
        className={classes.picture}
      >
        <Imgs img1={e.img1} name={e.name} price={e.price} />
      </div>
    );
  });

  return (
    <Fragment>
      <div className={classes.header}>
        <h3>MADE THE HARD WAY</h3>
        <h1>TOP TRENDING PRODUCTS</h1>
      </div>
      <div className={classes.frame}>{tam}</div>
    </Fragment>
  );
};

export default ProductsList;
