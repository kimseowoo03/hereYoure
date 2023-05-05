import api from "../axiosConfig";
import { AxiosError } from "axios";

interface emailAuthResponse {
  data: {
    result: boolean;
    error?: boolean;
    errorMessage?: boolean;
  };
  status: number;
}

export const emailAuth = async (email: string) => {
  try {
    //ToDo: 이메일 api post
    const res: emailAuthResponse = await api.post("/user/sendemail", {
      email,
    });
    if (res.data.result) {
      return res.data;
    }
  } catch (error) {
    const err = error as AxiosError;
    if (!err.response) {
      console.log("response가 없습니다.");
    } else if (err.request) {
      console.warn(`request: ${err.request}`);
    } else {
      console.warn(`error: ${err.message}`);
    }
  }
};
