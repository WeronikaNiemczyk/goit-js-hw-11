import axios from 'axios';
const API_KEY = '34850794-1a63b0f1d33e83dba8f53aae2';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page, perPage ) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    },
  });
  return response.data.hits;
};
