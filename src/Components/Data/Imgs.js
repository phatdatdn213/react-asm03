import { Fragment } from "react";
import { calculate } from "./Data";

const Imgs = (props) => {
  return (
    <Fragment>
      <img src={props.img1} alt={props.name} id={props.id} />
      <h4>{props.name}</h4>
      <p>{calculate(props.price)}</p>
    </Fragment>
  );
};

export default Imgs;
