import axios from 'axios';

const endpoint = 'https://pixabay.com/api/';
const KEY_API = '33963578-40585d75b8e2e6d6690e20bc4';

export const getImages = async (searchTerm, page) => {
  try {
    const response = await axios.get(
      `${endpoint}?key=${KEY_API}&q=${searchTerm}&page=${page}&per_page=12`
    );
    if (response.status === 200) {
      return response.data.hits;
    }
    return Promise.reject(new Error());
  } catch (error) {
    return error;
  }
};
