import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { AxiosError } from "axios";
import useUIState from "../store/useUIState";
import DeleteModal from "./DeleteModal";
import { useAccessToken } from "../store/useAccessTokenState";

interface IWorkroomDeleteProps {
  name: string;
  id?: string;
}

const WorkroomDeleteModal = ({ name, id }: IWorkroomDeleteProps) => {
  const navigate = useNavigate();
  const { setWorkroomDeleteModalOpen } = useUIState();
  const { accessToken } = useAccessToken();

  const handleDeleteSubmit = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const res = await api.delete(`/workroom/${id}`, config);
      if (res.data.result) {
        navigate('/mypage');
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

  const workroomDeleteModalProps = {
    title: "근무방",
    deleteName: name,
    cancleState: setWorkroomDeleteModalOpen,
    handleSubmit: handleDeleteSubmit,
  };
  return <DeleteModal {...workroomDeleteModalProps} />;
};

export default WorkroomDeleteModal;
