import React from "react";
import { ButtonProps } from "./button.interface";
import styles from "./button.module.scss";

const Button = (buttonProps: ButtonProps) => {
  const { style, type, onClick, changeStyle, name } = buttonProps;
  return (
    <>
      <button
        style={style}
        type={type}
        onClick={onClick}
        className={changeStyle ? styles.outlineBtn : styles.btn}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
