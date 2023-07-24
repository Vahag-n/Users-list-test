import { ButtonHTMLAttributes, ReactNode } from "react";

import { Mods, classNames } from "shared/lib/classNames/classNames";

import scss from "./Button.module.scss";

export enum ButtonTheme {
  OUTLINE = "outline",
  CLEAR = "clear",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    disabled,
    className,
    fullWidth,
    theme = ButtonTheme.OUTLINE,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Mods = {
    [scss.disabled]: disabled,
    [scss.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(scss.button, mods, [
        scss[size],
        scss[theme],
        className,
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
