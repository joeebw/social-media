import axios from "axios";

const getErrorMessage = (err: unknown) => {
  return axios.isAxiosError(err)
    ? err.response?.data?.message || "Server Error"
    : "Connection Error";
};

export default getErrorMessage;
