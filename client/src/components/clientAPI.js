//not really neccessary
import Axios from "axios";

export const AxiosGet = async (url) => {
  return await Axios.get(url);
};

export const AxiosPost = async (url, data) => {
  return await Axios.post(url, data);
};

export const AxiosPut = async (url, data) => {
  return await Axios.put(url, data);
};

export const AxiosDelete = async (url) => {
    return await Axios.delete(url)
}
