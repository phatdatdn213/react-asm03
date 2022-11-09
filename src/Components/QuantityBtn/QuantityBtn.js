import classes from "./QuantityBtn.module.css";
import { useEffect, useState } from "react";

const QuantityBtn = (props) => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    setNumber(props.getAmount);
  }, []);

  useEffect(() => {
    props.num(number);
  });

  const minus = () => {
    if (number > 1) {
      setNumber((prev) => prev - 1);
    }
  };

  const plus = () => {
    setNumber((prev) => prev + 1);
  };

  return (
    <div className={classes.wrapper}>
      <span onClick={minus}>-</span>
      <span className={classes.num}>{number}</span>
      <span onClick={plus}>+</span>
    </div>
  );
};

export default QuantityBtn;
