import BaseModal from "./BaseModal";
import Button from "../components/Button";
import style from "../styles/modals/DeleteModal.module.scss";

interface IDeleteModalProps {
  title: string;
  deleteName: string;
  cancleState: () => void;
  handleSubmit: () => void;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({
  title,
  deleteName,
  cancleState,
  handleSubmit,
}) => {
  return (
    <BaseModal>
      <div className={style.content}>
        <h1>{title} 삭제</h1>
        <p>{deleteName} 삭제 하시겠습니까?</p>
        <div className={style["button-div"]}>
          <Button
            children={"취소"}
            type={"button"}
            isCancel={true}
            onClick={cancleState}
          />
          <Button
            children={"삭제"}
            type={"button"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </BaseModal>
  );
};
export default DeleteModal;
