import React from "react";

import style from "../../styles/modules/button.module.scss";
import { getClass } from "../../utils/getClass";

const buttonClassName = {
  primary: "primary",
  secondary: "secondary",
};

function Button({ children, type, variant, ...rest }) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClass([
        style.button,
        style[`button--${buttonClassName[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, ...rest }) {
  return (
    <select
      className={getClass([style.button, style.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
