import axios from "axios";

export const getProducts = (page) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}v1/products?page=${page}`);
};

export const getRecordings = (page) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}v1/recording?page=${page}`);
};

export const uploadRecording = (name, blob) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}v1/recording-save`,
    {name, blob}
  );
};

export const deleteRecording = (id) => {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}v1/recording-delete/${id}`)
}