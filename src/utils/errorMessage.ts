import axios from "axios";

const getErrorMessage = (err: unknown) => {
  return axios.isAxiosError(err)
    ? err.response?.data?.message ||
        "An unexpected error occurred on the server. Please try again."
    : "Connection Error";
};

export default getErrorMessage;
