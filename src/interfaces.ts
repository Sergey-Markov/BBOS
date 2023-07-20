import type { RouteProp } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';

type TChildren = React.ReactNode;

export type TRegistration = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type TComment = {
  id: string | number;
  parentId: string | null;
  userName: string;
  userId: string;
  message: string;
  create_at: number;
};

export type TAbout = {
  id: string;
  count: string;
  icon: string;
  selectedIcon: string;
  selected: boolean;
};

export type TEventData = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  about: TAbout[];
  comments: TComment[];
};

export type TPost = {
  title: string;
  description: string;
  date: string;
  image: string;
  about: TAbout[];
  comments: TComment[];
};

export type TPostData =
  | {
      [key: string]: any;
      id: string | number;
    }
  | undefined;

export type TCommunityNewsData = {
  id: string;
  title: string;
  urlToImage: string;
  publishedAt: number;
  description: string;
  link: string;
};

export type TUser = {
  id: string | number;
  name: string;
  email: string;
  phone: '0981234567';
  address: string;
  room: string | number;
  city: string;
  state: string;
  country: string;
  avatar: string;
  createdAt: string;
};
export type JobsServiceCardType = {
  jobTitle: string;
  iconMaterialCommunityIcons: string;
  workers: {
    name: string;
    tel: string[];
    description: string;
  }[];
};

export type RootStackParamList = {
  EventPage: { screen?: string; id: string };
  CommunityNewsPage: {
    communityNewsData: TCommunityNewsData;
    screen?: string;
  };
  Main?: { title?: string; screen?: string };
  Settings?: { message: string; screen?: string };
  Details?: { message: string; screen?: string };
  Home?: { title?: string; screen?: string };
  Posts?: { message: string; screen: string };
  Chat?: { message: string; screen: string };
  News?: { message: string; screen: string };
  Drawer?: { message: string; screen: string };
  Scanner?: { message: string; screen: string };
  WebViewPage?: { url: string; screen: string };
  Profile?: { user: TUser };
  Servicing?: { isOpened: boolean };
  JobsList?: { service: JobsServiceCardType };
  Forms?: { formTitle: string };
  PostScreen?: { data: TPost | TPostData; isInputAutoFocused?: boolean };
};

export type Screens = keyof RootStackParamList;

export type ScreensRouteProp = RouteProp<RootStackParamList, Screens>;

export interface IScreenProps<ScreenName extends Screens> {
  navigation: NativeStackNavigationProp<RootStackParamList, ScreenName>;
  route: RouteProp<RootStackParamList, ScreenName>;
}

export type AuthStackParamList = {
  Login?: { title?: string; screen?: string };
  Registration?: { message: string; screen?: string };
};

export type ScreensAuth = keyof AuthStackParamList;
export type TAuthScreensRouteProp = RouteProp<AuthStackParamList, ScreensAuth>;

export interface IAuthScreenProps<ScreenName extends ScreensAuth> {
  navigation: NativeStackNavigationProp<AuthStackParamList, ScreenName>;
  route: TAuthScreensRouteProp;
}

export interface IBox {
  children: TChildren;
}
export interface ISpinerProps {
  color?: string;
  size?: number;
}

export interface IWeatherData {
  temp: string;
  wind: string;
  icon: string;
  description: string;
  city: string;
}

export interface IDataNews {
  author: string | null;
  title: string;
  description: string | null;
  urlToImage: string | null;
  publishedAt: string;
  url: string;
  content: string | null;
}

export interface ISwiperProps {
  mode?: 'horizontal-stack' | 'vertical-stack';
  snapDirection?: 'left' | 'right';
  pagingEnabled?: boolean;
  snapEnabled?: boolean;
  dataOptions: TEventData[] | any;
  children: (item: TEventData | any) => JSX.Element;
}
