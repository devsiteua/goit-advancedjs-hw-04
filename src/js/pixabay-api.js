import axios from 'axios';

const API_KEY = '56208412-7d6dcb228c67b365f0b5ce0be';
const BASE_URL = 'https://pixabay.com/api/';

export const IMAGES_PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: IMAGES_PER_PAGE,
    },
  });

  return response.data;
}
