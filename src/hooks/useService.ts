import React, { useCallback, useEffect, useState } from 'react';
import { IWeatherData } from '../interfaces';
import { weatherServices } from '../services/weatherApi';

const useService = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | false>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getWeather = useCallback(async () => {
    try {
      setLoading(true);
      const data = await weatherServices();
      if (data) {
        const result = {
          temp: `${String(data.data.main.feels_like.toFixed(1))}C°`,
          wind: `${String(data.data.wind.speed.toFixed(1))} m/s`,
          icon: String(data.data.weather[0].icon),
          description: String(data.data.weather[0].description),
          city: String(data.data.name),
        };
        setWeatherData(result);
        setLoading(false);
        return;
      }
      throw new Error('Weather don`t get');
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    getWeather();
  }, []);

  return { weatherData, loading, error };
};

export default useService;
