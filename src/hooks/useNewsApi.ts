import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { IDataNews } from '../interfaces';
import { newsServices } from '../services/newsApi';

const useNewsApi = (needGetNews: boolean) => {
  const [newsData, setNewsData] = useState<IDataNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await newsServices();
      if (data) {
        const normalizeData = data.map((item: IDataNews) => {
          return {
            author: item.author,
            title: item.title,
            description: item.description,
            urlToImage: item.urlToImage || 'https://picsum.photos/550/250',
            publishedAt: moment(item.publishedAt).format('LLL'),
            url: item.url,
            content: item.content,
          };
        });

        setNewsData(normalizeData);
        setLoading(false);
        return;
      }
      throw new Error('News don`t get');
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    if (needGetNews) {
      getNews();
    }
  }, [needGetNews]);

  return { newsData, setNewsData, loading, error };
};

export default useNewsApi;
