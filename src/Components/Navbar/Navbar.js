import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../Store/LoginStatus";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const inf = useSelector((state) => state.login.content);

  const getUser = localStorage.getItem("on_login");

  useEffect(() => {
    if (getUser !== null) {
      dispatch(loginActions.on_login(JSON.parse(getUser)));
      // console.log(inf);
    }
  }, []);

  const logoutHandle = () => {
    localStorage.removeItem("on_login");
    dispatch(loginActions.on_logout());
  };

  return (
    <div className={classes.frame}>
      <div className={classes.textLeft}>
        <span
          onClick={() => {
            navigate("/");
          }}
          className={classes.active}
        >
          Home
        </span>
        <span
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </span>
      </div>

      <span className={classes.title}>BOUTIQUE</span>

      <div className={classes.textRight}>
        {
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        }
        <span
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </span>
        {isLogin && <span>({inf.name})</span>}
        {isLogin && <span onClick={logoutHandle}>[Logout]</span>}
      </div>
    </div>
  );
};

export default Navbar;
