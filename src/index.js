import Notiflix from 'notiflix';
import { createGalleryMarkup } from './gallery';
import { fetchImages } from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let perPage = 40;
let searchQuery = '';
let initialSearchQuery = '';
let simpleLightBox;
loadMoreBtn.style.display = 'none';

const searchingWindow = async event => {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery !== initialSearchQuery) {
    page = 1;
    initialSearchQuery = searchQuery;
  }
  // loadMoreBtn.style.display = 'block';

  if (searchQuery === '') {
    loadMoreBtn.style.display = 'none';
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  try {
    const hits = await fetchImages(searchQuery, page, perPage);
    const resultAmount = hits.length;
    // const { hits, totalHits } = data;
    if (resultAmount === 0) {
      loadMoreBtn.style.display = 'none';
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      const cardsMarkup = createGalleryMarkup(hits);
      galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      if (resultAmount < 40) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
};

const loadMore = async () => {
  page += 1;
  const searchQuery = searchForm.elements.searchQuery.value.trim();
  // const currentsearchQuery = searchForm.elements.searchQuery.value.trim();
  if (searchQuery !== initialSearchQuery) {
    page = 1;
    return Notiflix.Notify.warning(
      'Sorry, you cannot load more results for a different search query.'
    );
  }
  const totalHits = await fetchImages(searchQuery, page, perPage);
  console.log({ totalHits });
  simpleLightBox = new SimpleLightbox('.gallery a').refresh();

  if (totalHits <= perPage) {
    loadMoreBtn.style.display = 'none';
    return Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    // } else if (totalHits <= 40) {
    //   // page = +1;
    //   loadMoreBtn.style.display = 'none';
  } else {
    // page += 1;
    const newPages = createGalleryMarkup(totalHits);
    galleryContainer.insertAdjacentHTML('beforeend', newPages);
  }
  return totalHits;
};

searchForm.addEventListener('submit', searchingWindow);
loadMoreBtn.addEventListener('click', loadMore);
