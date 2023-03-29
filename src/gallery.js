const galleryContainer = document.querySelector('.gallery');

// const properties = {
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// };

export const createGallery = images => {
  const markup = images
    .map(image => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<div class="photo-card"><a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>"${likes}"
      </p>
      <p class="info-item">
        <b>Views</b>"${views}"
      </p>
      <p class="info-item">
        <b>Comments</b>"${comments}"
      </p>
      <p class="info-item">
        <b>Downloads</b>"${downloads}"
      </p>
    </div>
  </div>`;
    })
    .join('');
  console.log('markup:', markup);
  galleryContainer.innerHTML = markup;
};

console.log(createGallery());
