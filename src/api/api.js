import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:3000/api/`
  //baseURL: `http://35.202.24.146:80/api/`
});