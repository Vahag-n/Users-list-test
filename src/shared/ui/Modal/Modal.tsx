import { ReactNode } from "react";

import { useModal } from "shared/hooks/useModal/useModal";
import { Mods, classNames } from "shared/lib/classNames/classNames";

import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

import scss from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { close, isMounted } = useModal({
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [scss.opened]: isOpen,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById("app") ?? document.body}>
      <div className={classNames(scss.Modal, mods, [className, "app_modal"])}>
        <Overlay onClick={close} />
        <div className={scss.content}>{children}</div>
      </div>
    </Portal>
  );
};
