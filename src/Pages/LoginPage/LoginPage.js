import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../Store/LoginStatus";
import classes from "../RegisterPage/RegisterPage.module.css";
import bannerImg from "../../Resource Assignment 03/banner1.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userArray = localStorage.getItem("user") || [];
  if (userArray.length !== 0) {
    userArray = JSON.parse(userArray);
  }

  const emailRef = useRef();
  const passRef = useRef();

  const [validated, setValidated] = useState({ status: false, message: [] });

  const emailValidated = (inf, err) => {
    const getEmail = emailRef.current.value;
    if (getEmail === "") {
      err.push("Please input email!");
      return;
    }
    if (!getEmail.includes("@")) {
      err.push("Please input correct email!");
      return;
    }

    const test = userArray.filter((item) => {
      return item.email === getEmail;
    });
    // console.log(test);
    if (test.length === 0) {
      err.push("Email is not registered!");
      return;
    }
    inf.email = getEmail;
  };

  const passValidated = (inf, err) => {
    const getPass = passRef.current.value;
    if (getPass === "") {
      err.push("Please input password");
      return;
    }
    if (getPass.length < 9) {
      err.push("Password need to have more than 8 words");
      return;
    }

    const test = userArray.filter((item) => {
      return item.pass === getPass && item.email === inf.email;
    });
    console.log(test);
    if (test.length === 0) {
      err.push("Wrong password");
      passRef.current.value = "";
      return;
    }
    inf.pass = getPass;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let inf = {};
    let err = [];

    emailValidated(inf, err);
    passValidated(inf, err);

    if (err.length !== 0) {
      setValidated({ status: false, message: err });
      return;
    }

    [inf] = userArray.filter((item) => {
      return item.email === inf.email;
    });

    setValidated({ status: true, message: [] });
    //

    userArray.push(inf);
    dispatch(loginActions.on_login(inf));
    localStorage.setItem("on_login", JSON.stringify(inf));
    //
    navigate("/");
  };

  return (
    <div className={classes.banner}>
      <img src={bannerImg} alt="banner" />
      <div className={classes.signForm}>
        <h2>Sign In</h2>
        <form className={classes.form} onSubmit={formSubmit}>
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="Password" placeholder="Password" ref={passRef} />
          {!validated.status &&
            validated.message.map((item) => {
              return (
                <p className={classes.err} key={item}>
                  {item}
                </p>
              );
            })}
          <button className={classes.btn}>SIGN IN</button>
          <p>
            Create an account?
            <span>
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
