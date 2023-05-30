import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAccessToken } from "../store/useAccessTokenState";
import useUIState from "../store/useUIState";
import DeleteModal from "./DeleteModal";
import api from "../axiosConfig";

interface IWorkerDeleteModalProps {
  id: number;
  name: string;
}

const WorkerDeleteModal = ({ id, name }: IWorkerDeleteModalProps) => {
  const navigate = useNavigate();
  const { setWokerDeleteModalOpen } = useUIState();
  const { accessToken } = useAccessToken();
  const handleDeleteSubmit = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const res = await api.delete(`/worker?id=${id}`, config);
      if (res.data.result) {
        setWokerDeleteModalOpen();
        navigate(-1);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else {
        console.log(err);
        console.warn(`error: ${err.message}`);
      }
    }
  };
  const workerDeleteModalProps = {
    title: "근무자",
    deleteName: name,
    cancleState: setWokerDeleteModalOpen,
    handleSubmit: handleDeleteSubmit,
  };
  return <DeleteModal {...workerDeleteModalProps} />;
};

export default WorkerDeleteModal;
