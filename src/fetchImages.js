import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34850794-1a63b0f1d33e83dba8f53aae2';

export const fetchImages = async query => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  console.log('response: ', response);
  return response;
};
console.log('fetchImages: ', fetchImages());
