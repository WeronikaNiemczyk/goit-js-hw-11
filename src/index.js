import Notiflix from 'notiflix';
import { createGalleryMarkup } from './gallery';
import { fetchImages } from './fetchImages';

const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');

const searchingWindow = async event => {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  // console.log('searchQuery', searchQuery);
  if (searchQuery === '') {
    return Notiflix.Notify.failure('Search query cannot be empty');
  }

  try {
    const hits = await fetchImages(searchQuery);

    if (hits.length === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const cardsMarkup = createGalleryMarkup(hits);
    galleryContainer.insertAdjacentHTML('afterend', cardsMarkup);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
};

searchForm.addEventListener('submit', searchingWindow);
