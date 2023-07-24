import React, { InputHTMLAttributes, memo } from "react";

import { classNames } from "shared/lib/classNames/classNames";

import scss from "./Input.module.scss";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = "text",
    autofocus,
    readonly,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(value);
  };
  console.log(scss);
  return (
    <div className={classNames(scss.inputWrapper, {}, [className])}>
      <input
        type={type}
        value={value}
        autoFocus={autofocus}
        onChange={onChangeHandler}
        className={scss.input}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onSelect={onSelect}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  );
});
