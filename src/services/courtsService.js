import axios from 'axios'
const API_URL = `${process.env.REACT_APP_API_URL}`;

const getAllCourts = () => {
    return axios.get(API_URL + "/courts");
  };

  const getCourt = id => {
    return axios.get(API_URL + `/courts/${id}`);
  };

  export default {
      getAllCourts,
      getCourt
  }