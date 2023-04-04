import Notiflix from 'notiflix';
import { createGalleryMarkup } from './gallery';
import { fetchImages } from './fetchImages';

const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let perPage = 40;
let totalHits;
loadMoreBtn.style.display = 'none';

const searchingWindow = async event => {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  loadMoreBtn.style.display = 'block';
  page = 1;
  if (searchQuery === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  try {
    const hits = await fetchImages(searchQuery, page, perPage);
    // const { hits, totalHits } = data;
    if (hits.length === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const cardsMarkup = createGalleryMarkup(hits);
    galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

    if (totalHits > perPage) {
      loadMoreBtn.style.display = 'block';
    }
    if (totalHits <= page * perPage) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
};

const loadMore = async () => {
  page += 1;
  // const searchQuery = searchForm.elements.searchQuery.value.trim();
  try {
    const data = await fetchImages(searchQuery, page, perPage).then(
      ({ data }) => {
        if (data.totalHits === 0) {
          loadMoreBtn.style.display = 'none';

          return Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          const newPages = createGalleryMarkup(data.hits);
          galleryContainer.insertAdjacentHTML('beforeend', newPages);
        }
      }
    );
  } catch (error) {
    Notiflix.Notify.warning('Sorry, error');
  }
  console.log(loadMore());
};

searchForm.addEventListener('submit', searchingWindow);
loadMoreBtn.addEventListener('click', loadMore);
