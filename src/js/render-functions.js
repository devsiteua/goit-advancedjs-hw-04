import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  preloading: false,
  alertError: false,
});

function createGalleryCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
        <ul class="gallery__info">
          <li class="gallery__info-item">
            <span class="gallery__info-title">Likes</span>
            <span class="gallery__info-value">${likes}</span>
          </li>
          <li class="gallery__info-item">
            <span class="gallery__info-title">Views</span>
            <span class="gallery__info-value">${views}</span>
          </li>
          <li class="gallery__info-item">
            <span class="gallery__info-title">Comments</span>
            <span class="gallery__info-value">${comments}</span>
          </li>
          <li class="gallery__info-item">
            <span class="gallery__info-title">Downloads</span>
            <span class="gallery__info-value">${downloads}</span>
          </li>
        </ul>
      </a>
    </li>
  `;
}

export function createGallery(images) {
  const markup = images.map(createGalleryCard).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
