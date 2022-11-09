import classes from "./DetailPage.module.css";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useData, { calculate } from "../../Components/Data/Data";
import Imgs from "../../Components/Data/Imgs";
import QuantityBtn from "../../Components/QuantityBtn/QuantityBtn";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { listCartActions } from "../../Store/ListCart";

const DetailPage = () => {
  const dispatch = useDispatch();

  const [detail, setDetail] = useState({
    price: "",
    long_desc: "",
    category: "",
  });
  const [list, setList] = useState([]);
  const [amount, setAmount] = useState(1);

  const navigate = useNavigate();
  const params = useParams();

  const isLogin = useSelector((state) => state.login.isLogin);

  function getData(arr) {
    const [pick] = arr.filter((item) => item._id.$oid === params.id);
    setDetail(pick);
    const relativeArray = arr.filter(
      (items) => items.category === pick.category
    );
    setList(relativeArray);
  }

  useData(getData);

  const getID = (e) => {
    navigate(`/detail/${e.target.id}`);
  };

  const getValue = (e) => {
    setAmount(e);
  };

  const submitHandle = () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      const pack = { ...detail, amount };
      let getOld = JSON.parse(localStorage.getItem("cartList")) || [];
      const index = getOld.findIndex((item) => item._id.$oid === pack._id.$oid);
      if (index !== -1) {
        getOld[index] = pack;
      } else getOld.push(pack);

      localStorage.setItem("cartList", JSON.stringify(getOld));
      dispatch(listCartActions.add_cart(getOld));

      navigate("/cart");
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className={classes.frame}>
        <div>
          <img src={detail.img1} alt={detail.name} />
        </div>
        <div>
          <h2>{detail.name}</h2>
          <p>{calculate(detail.price)}</p>
          <p>{detail.short_desc}</p>
          <h4>
            CATEGORY: <span>{detail.category}</span>
          </h4>
          <div className={classes.adjust}>
            <span>QUANTITY </span>
            <span>
              <QuantityBtn num={getValue} getAmount={1} />
            </span>
            <span className={classes.btn} onClick={submitHandle}>
              Add to Cart
            </span>
          </div>
        </div>
      </div>
      <div className={classes.discription}>
        <div>
          <button className={classes.btn}>DESCRIPTION</button>
          <p className={classes.fix}>{detail.long_desc}</p>
        </div>
      </div>
      <h3 style={{ textAlign: "left" }}>RELATED PRODUCTS</h3>
      <div className={classes.bottom}>
        {list.map((e) => {
          return (
            <div key={e._id.$oid} onClick={getID}>
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
    </Fragment>
  );
};

export default DetailPage;
