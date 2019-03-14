import axios from 'axios';

export default axios.create({
  baseURL: `https://angeliaforos.herokuapp.com/`
  //baseURL: `http://localhost:3007/`
});