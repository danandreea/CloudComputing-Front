import axios from 'axios'
const API_URL = `${process.env.REACT_APP_API_URL}`;

const getAllRezervations = () => {
    return axios.get(API_URL + "/rezervations");
  };

  const AddRezervation = data => {
    return axios.post(API_URL + "/rezervations", data);
  };

  const getRezervationsCourt = id => {
    return axios.get(API_URL + `/rezervations/${id}`);
  };


export default {
  getAllRezervations,
  AddRezervation,
  getRezervationsCourt
}