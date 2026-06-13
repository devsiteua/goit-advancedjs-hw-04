import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import './css/styles.css';

import { getImagesByQuery, IMAGES_PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const submitBtn = form.querySelector('button[type="submit"]');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');

let searchQuery = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

async function handleSearchFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });

    return;
  }

  searchQuery = query;
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  submitBtn.disabled = true;
  loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);
    updateLoadMoreButtonState();
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    submitBtn.disabled = false;
    loadMoreBtn.disabled = false;
  }
}

async function handleLoadMoreBtnClick() {
  page += 1;

  hideLoadMoreButton();
  showLoader();
  submitBtn.disabled = true;
  loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(searchQuery, page);
    const firstNewCardIndex = gallery.children.length;

    createGallery(data.hits);
    updateLoadMoreButtonState();
    scrollToFirstNewCard(firstNewCardIndex);
  } catch {
    page -= 1;

    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    submitBtn.disabled = false;
    loadMoreBtn.disabled = false;
  }
}

function updateLoadMoreButtonState() {
  const loadedImages = page * IMAGES_PER_PAGE;

  if (loadedImages >= totalHits) {
    hideLoadMoreButton();

    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });

    return;
  }

  showLoadMoreButton();
}

function scrollToFirstNewCard(firstNewCardIndex) {
  const firstNewCard = gallery.children[firstNewCardIndex];

  if (!firstNewCard) {
    return;
  }

  const firstNewCardTop = firstNewCard.getBoundingClientRect().top;

  window.scrollBy({
    top: firstNewCardTop,
    behavior: 'smooth',
  });
}
