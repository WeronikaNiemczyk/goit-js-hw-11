import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';
import { createGallery } from './gallery';

const searchForm = document.querySelector('.search-form');
const submitButton = document.querySelector('submit');
const galleryContainer = document.querySelector('.gallery');
let query = '';

const searchingWindow = event => {
  query = event.target.value.trim();
  console.log('query: ', query);
  galleryContainer.innerHTML = '';
  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  fetchImages(query)
    .then(dataList => {
      console.log('dataList', dataList);
      if (dataList === 0) {
        Notiflix.Notify.failure(
          'The search string cannot be empty. Please specify your search query.'
        );
      } else {
        createGallery(dataList);
        galleryContainer.innerHTML = markup;
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
};
console.log(searchingWindow());

searchForm.addEventListener('submit', searchingWindow);
