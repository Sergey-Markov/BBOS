import axios from 'axios';

const API_KEY = `fb9d938c08bf457eb88f752a8b78d0b2`;
const endpoint = `https://newsapi.org/v2/top-headlines`;
const country = 'ru';

export const newsServices = async (category = 'general') => {
  const result = await axios.get(
    `${endpoint}?country=${country}&category=${category}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return result.data.articles;
};
