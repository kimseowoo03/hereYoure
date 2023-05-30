import { AxiosError } from "axios";
import useUIState from "../store/useUIState";
import DeleteModal from "./DeleteModal";
import { useAccessToken } from "../store/useAccessTokenState";
import api from "../axiosConfig";

interface IHistoryDeleteModalProps {
  wokerId: number;
}

const HistoryDeleteModal= ({wokerId}:IHistoryDeleteModalProps) => {
  const {setHistoryDeleteModalOpen, historyCheckedArray } = useUIState();
  const {accessToken} = useAccessToken();
  console.log(historyCheckedArray, "선택된 id들 입니다.")

  const handleDeleteSubmit = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const idsString = historyCheckedArray.join('&id=');
      const url = `/history?id=${wokerId}&id=${idsString}`

      const res = await api.delete(url, config)

      if(res.data.result){
        setHistoryDeleteModalOpen();
        window.location.reload();
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else {
        console.warn(`error: ${err.message}`);
      }
    }
  }
  const workerDeleteModalProps = {
    title: "근무 정보",
    deleteName: "선택하신 근무 정보를",
    cancleState: setHistoryDeleteModalOpen,
    handleSubmit: handleDeleteSubmit,
  };
  return <DeleteModal {...workerDeleteModalProps} />;
};

export default HistoryDeleteModal;
