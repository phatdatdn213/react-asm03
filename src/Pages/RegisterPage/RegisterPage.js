import classes from "./RegisterPage.module.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bannerImg from "../../Resource Assignment 03/banner1.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();

  let userArray = localStorage.getItem("user") || [];
  if (userArray.length !== 0) {
    userArray = JSON.parse(userArray);
  }

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const phoneRef = useRef();

  const [validated, setValidated] = useState({ status: false, message: [] });

  const nameValidated = (inf, err) => {
    const getName = nameRef.current.value;
    if (getName === "") {
      err.push("Please input name!");
      return;
    }
    inf.name = getName;
  };

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
    if (test.length !== 0) {
      err.push("Email is already registered!");
      return;
    }
    inf.email = getEmail;
  };

  const passValidated = (inf, err) => {
    const getPass = passRef.current.value;
    if (getPass === "") {
      err.push("Please input password!");
      return;
    }
    if (getPass.length < 9) {
      err.push("Password need to have more than 8 words");
      return;
    }
    inf.pass = getPass;
  };

  const phoneValidated = (inf, err) => {
    const getPhone = phoneRef.current.value;
    if (getPhone.length < 10) {
      err.push("Please input correct phone number!");
      return;
    }
    inf.phone = getPhone;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let inf = {};
    let err = [];
    nameValidated(inf, err);
    emailValidated(inf, err);
    passValidated(inf, err);
    phoneValidated(inf, err);

    if (err.length !== 0) {
      console.log(...err);
      setValidated({ status: false, message: err });
      return;
    }

    setValidated({ status: true, message: [] });

    userArray.push(inf);
    localStorage.setItem("user", JSON.stringify(userArray));
    //
    navigate("/login");
  };

  return (
    <div className={classes.banner}>
      <img src={bannerImg} alt="banner" />
      <div className={classes.signForm}>
        <h2>Sign Up</h2>
        <form className={classes.form} onSubmit={formSubmit}>
          <input type="text" placeholder="Full Name" ref={nameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="Password" placeholder="Password" ref={passRef} />
          <input type="number" placeholder="Phone" ref={phoneRef} />
          <button className={classes.btn}>SIGN UP</button>
          {!validated.status &&
            validated.message.map((item) => {
              return (
                <p className={classes.err} key={item}>
                  {item}
                </p>
              );
            })}
          <p>
            Login?
            <span>
              <Link to="/login">Click</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
