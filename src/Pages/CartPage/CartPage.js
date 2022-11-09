import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantityBtn from "../../Components/QuantityBtn/QuantityBtn";
import { listCartActions } from "../../Store/ListCart";
import { sum, calculate, total } from "../../Components/Data/Data";
import classes from "./CartPage.module.css";
import { Link } from "react-router-dom";
import BannerTop from "../../Components/BannerTop/BannerTop";
import Navbar from "../../Components/Navbar/Navbar";

const CartPage = () => {
  let theOrder = 0;

  const listCart = useSelector((state) => state.listCart.content);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMemory = JSON.parse(localStorage.getItem("cartList")) || [];

    dispatch(listCartActions.add_cart(getMemory));
  }, []);

  const getOrder = (e) => {
    if (e.target.parentNode.parentNode.id) {
      theOrder = e.target.parentNode.parentNode.id;
    } else return;
  };

  const getValue = (e) => {
    const gop = { order: theOrder, value: e };

    dispatch(listCartActions.update_cart(gop));
  };

  const deleteHandle = (e) => {
    dispatch(listCartActions.delete_cart(e.target.parentNode.id));
  };

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(listCart));
  }, [getOrder]);

  const showList = listCart.map((item) => {
    return (
      <div className={classes.list} key={item._id.$oid} onClick={getOrder}>
        <div>
          <img src={item.img1} alt={item.name} />
        </div>
        <div>
          <h5>{item.name}</h5>
        </div>
        <div>
          <p>{calculate(item.price)}</p>
        </div>

        <div id={item._id.$oid}>
          <QuantityBtn num={getValue} getAmount={item.amount} />
        </div>

        <div>{calculate(total(item.price, item.amount))}</div>
        <div id={item._id.$oid}>
          <h5 onClick={deleteHandle}>REMOVE</h5>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Navbar />
      <BannerTop left={"CART"} right={"CART"} />
      <h1 style={{ textAlign: "left" }}>SHOPPING CART</h1>
      <div className={classes.frame}>
        <div className={classes.left}>
          <div className={`${classes.list} ${classes.title}`}>
            <div>
              <h5>IMAGE</h5>
            </div>
            <div>
              <h5>PRODUCT</h5>
            </div>
            <div>
              <h5>PRICE</h5>
            </div>
            <div>
              <h5>QUALITY</h5>
            </div>
            <div>
              <h5>TOTAL</h5>
            </div>
            <div>
              <h5>REMOVE</h5>
            </div>
          </div>
          {showList}
          <div className={classes.nav}>
            <Link to="/shop">
              <span className={classes.process}>Continue shopping</span>
            </Link>
            <Link to="/checkout">
              <span className={classes.checkout}>Proceed to checkout</span>
            </Link>
          </div>
        </div>
        <div className={classes.right}>
          <h2>CART TOTAL</h2>
          <div>
            <span>SUBTOTAL</span>
            <span className={classes.priceRight}>
              {calculate(sum(listCart))}
            </span>
          </div>
          <hr />
          <div>
            <span>TOTAL</span>
            <span className={classes.priceRight}>
              {calculate(sum(listCart))}
            </span>
          </div>
          <input type="text" placeholder="Enter your coupon" />
          <button>Apply coupon</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
