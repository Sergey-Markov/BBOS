import axios from 'axios';

const latitude = 49.44;
const longitude = 32.06;
const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e30999851601f5f0a6c6d040e552c360';

export const weatherServices = async (lat = latitude, long = longitude) => {
  const result = axios.get(
    `${endpoint}?lat=${lat}&lon=${long}&lang=ua&units=metric&appid=${API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return result;
};

// weatherData Object {
//   "base": "stations",
//   "clouds": Object {
//     "all": 98,
//   },
//   "cod": 200,
//   "coord": Object {
//     "lat": 49.44,
//     "lon": 32.06,
//   },
//   "dt": 1685108542,
//   "id": 710791,
//   "main": Object {
//     "feels_like": 19.55,
//     "grnd_level": 1002,
//     "humidity": 72,
//     "pressure": 1015,
//     "sea_level": 1015,
//     "temp": 19.65,
//     "temp_max": 19.65,
//     "temp_min": 19.65,
//   },
//   "name": "Cherkasy",
//   "sys": Object {
//     "country": "UA",
//     "sunrise": 1685066149,
//     "sunset": 1685122921,
//   },
//   "timezone": 10800,
//   "visibility": 10000,
//   "weather": Array [
//     Object {
//       "description": "хмарно",
//       "icon": "04d",
//       "id": 804,
//       "main": "Clouds",
//     },
//   ],
//   "wind": Object {
//     "deg": 38,
//     "gust": 4.87,
//     "speed": 2.88,
//   },
// }
