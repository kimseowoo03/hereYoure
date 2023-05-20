import { ReactComponent as EmptyIcon } from "../../assets/emptydata.svg";
import style from "../../styles/UI/EmptyDataContainer.module.scss";

export const EmptyDataContainer = ({ message }: { message: string }) => {
  return (
    <div className={style.content}>
      <EmptyIcon />
      <p>{message}</p>
    </div>
  );
};
