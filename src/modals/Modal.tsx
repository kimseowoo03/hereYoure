import { Fragment, ReactElement } from "react";
import style from "../styles/Modal.module.scss"

interface ModalProps {
  children: ReactElement;
}

const Backdrop = () => {
  return <div className={style.backdrop}></div>;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <Fragment>
      <Backdrop />
      <div className={style.modal}>
        <div className={style.content}>{children}</div>
      </div>
    </Fragment>
  );
};

export default Modal;