import { memo } from "react";

import { classNames } from "shared/lib/classNames/classNames";

import scss from "./Overlay.module.scss";

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(scss.Overlay, {}, [className])}
    />
  );
}); 
