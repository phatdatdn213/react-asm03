import classes from "./Popup.module.css";
import { calculate } from "../Data/Data";
import { popupActions } from "../../Store/PopupStore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const Popup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detail = useSelector((state) => state.popup.content);

  const getId = (e) => {
    const chosen = e.target.id;
    navigate(`/detail/${chosen}`);
  };

  const closeHandler = () => {
    dispatch(popupActions.hide_popup());
  };

  return (
    <div className={classes.modal}>
      <div className={classes.frame}>
        <button className={classes.btn} onClick={closeHandler}>
          &times;
        </button>
        <div>
          <img src={detail.img1} alt={detail.name} />
        </div>
        <div>
          <h3>{detail.name}</h3>
          <h4>{calculate(detail.price)}</h4>
          <p>{detail.short_desc}</p>
          <button id={detail._id.$oid} className={classes.view} onClick={getId}>
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
