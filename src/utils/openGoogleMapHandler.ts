import goToUrl from './goToUrl';

type TOpenGoogleMapHandler = (address: string) => void;

const initialUrl = 'https://www.google.com.ua/maps/place/';

const openGoogleMapHandler: TOpenGoogleMapHandler = (address: string) => {
  const url = initialUrl + address;
  goToUrl(url);
};

export default openGoogleMapHandler;
