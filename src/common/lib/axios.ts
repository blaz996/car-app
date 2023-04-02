import Axios from 'axios';

export const axios = Axios.create({
  baseURL: `https://api.baasic.com/v1/${process.env.REACT_APP_API_KEY}`,
  headers: {
    'Content-Type': 'application/hal+json',
    Authorization: `bearer ${process.env.REACT_APP_API_AUTH}`,
  },
});
