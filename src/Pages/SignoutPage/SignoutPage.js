import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BannerTop from "../../Components/BannerTop/BannerTop";
import { listCartActions } from "../../Store/ListCart";
import { calculate, sum } from "../../Components/Data/Data";
import classes from "./SignoutPage.module.css";

const SignoutPage = () => {
  const listCart = useSelector((state) => state.listCart.content);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMemory = JSON.parse(localStorage.getItem("cartList")) || [];

    dispatch(listCartActions.add_cart(getMemory));
  }, []);

  const listCheckout = listCart.map((e) => {
    return (
      <Fragment key={e._id.$oid}>
        <div className={classes.cover}>
          <p>{e.name}</p>
          <p className={classes.priceRight}>{`${calculate(e.price)} x ${
            e.amount
          }`}</p>
        </div>
        <hr />
      </Fragment>
    );
  });

  const formHandle = (e) => {
    e.preventDefault();
    return;
  };

  return (
    <Fragment>
      <div>
        <BannerTop left={"CART"} right={"HOME/CART/CHECKOUT"} />
      </div>
      <h2 style={{ textAlign: "left" }}>BILLING DETAILS</h2>
      <div className={classes.frame}>
        <div className={classes.left}>
          <form onClick={formHandle}>
            <p>FULL NAME:</p>
            <input type="text" placeholder="Enter Your Full Name Here" />
            <p>EMAIL:</p>
            <input type="email" placeholder="Enter Your Email Here" />
            <p>PHONE NUMBER:</p>
            <input type="Enter Your Phone Number Here" placeholder="Phone" />
            <p>ADDRESS:</p>
            <input type="text" placeholder="Enter Your Address Here" />
            <button className={classes.btn}>Place Order</button>
          </form>
        </div>

        <div className={classes.right}>
          <h2>CART TOTAL</h2>
          {listCheckout}
          <div>
            <span>TOTAL</span>
            <span style={{ float: "right" }}>{calculate(sum(listCart))}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignoutPage;
