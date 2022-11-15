import axios from 'axios';
const baseUrl = 'https://heroku-nodejs-11.herokuapp.com';

// Passing configuration object to axios
export const axiosClient = axios({
  method: 'get',
  url: `${baseUrl}/bars`,
}).then((response) => {
  console.log(response.data);
});