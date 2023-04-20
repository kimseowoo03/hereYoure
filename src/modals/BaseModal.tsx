import { Fragment, ReactElement } from "react";
import style from "../styles/modals/BaseModal.module.scss";

interface ModalProps {
  children: ReactElement;
}

const Backdrop = () => {
  return <div className={style.backdrop}></div>;
};

const BaseModal = ({ children }: ModalProps) => {
  return (
    <Fragment>
      <Backdrop />
      <div className={style.layout}>
        <div className={style.modal}> {children}</div>
      </div>
    </Fragment>
  );
};

export default BaseModal;
