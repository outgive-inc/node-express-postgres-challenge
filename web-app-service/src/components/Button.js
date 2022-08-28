import React from 'react';
import style from '../styles/modules/button.module.scss'
import { getClasses } from '../utils/getClasses';

const buttonTypes = {
    primary: 'primary',
    secondary: 'secondary'
}

function Button({children, type, variant="primary", ...rest}) {
  return (
    <button className={getClasses([
        style.button,
        style[`button--${buttonTypes[variant]}`],
        ])} 
        type={type === "submit" ? "submit" : "button"} {...rest}>
        {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
    return (
      <select
        id={id}
        className={getClasses([style.button, style.button__select])}
        {...rest}
      >
        {children}
      </select>
    );
  }

export {SelectButton}
export default Button
