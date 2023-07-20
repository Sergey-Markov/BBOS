import React, { lazy } from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import Settings from './Settings/Settings';
import Details from './Details/Details';
import BottomNavigation from './BottomNavigation';
import { RootStackParamList } from '../interfaces';
import Weather from '../components/shared/Weather/Weather';
import EventPage from './EventPage/EventPage';
import CommunityNewsPage from './CommunityNewsPage/CommunityNewsPage';
import GoBackBtn from '../components/shared/GoBackBtn/GoBackBtn';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import WebViewPage from './WebViewPage/WebViewPage';
import Profile from './Profile/Profile';
import Servicing from './Servicing/Servicing';
import JobsList from './JobsList/JobsList';
import TelephoneDirectory from './TelephoneDirectory/TelephoneDirectory';
import Forms from './Forms/Forms';
import PostScreen from './PostScreen/PostScreen';

const Camera = lazy(() => import('../components/shared/Scanner/Scanner'));

const DRAWER_SCREENS = [
  {
    id: '1',
    name: 'EventPage',
    component: EventPage,
    options: { title: 'Event', headerRight: GoBackBtn },
  },
  {
    id: '2',
    name: 'CommunityNewsPage',
    component: CommunityNewsPage,
    options: { title: 'Community News', headerRight: GoBackBtn },
  },
  {
    id: '3',
    name: 'Settings',
    component: Settings,
    options: { headerRight: GoBackBtn },
  },
  {
    id: '4',
    name: 'Details',
    component: Details,
    options: { headerRight: GoBackBtn },
  },
  {
    id: '5',
    name: 'Scanner',
    component: Camera,
    options: {
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '6',
    name: 'WebViewPage',
    component: WebViewPage,
    options: {
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '7',
    name: 'Profile',
    component: Profile,
    options: {
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '8',
    name: 'Servicing',
    component: Servicing,
    options: {
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '9',
    name: 'JobsList',
    component: JobsList,
    options: {
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '9',
    name: 'TelephoneDirectory',
    component: TelephoneDirectory,
    options: {
      title: 'Telephone directory',
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '10',
    name: 'Forms',
    component: Forms,
    options: {
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
  {
    id: '11',
    name: 'PostScreen',
    component: PostScreen,
    options: {
      title: 'Post',
      headerRight: GoBackBtn,
      presentation: 'modal',
      unmountOnBlur: true,
    },
  },
];

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator = ({ getHeaderTitle }: any) => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerRightContainerStyle: {
          paddingRight: 10,
        },
        headerRight: () => <Weather />,
      }}
    >
      <Drawer.Screen
        name="Main"
        component={BottomNavigation}
        options={({ route }) => {
          const routeName = getHeaderTitle(route);
          return {
            headerTitle: routeName,
            headerRight: () => {
              const homeScreenName = 'Home' === routeName;
              return homeScreenName && <Weather />;
            },
          };
        }}
      />
      {DRAWER_SCREENS.map((screen) => (
        <Drawer.Screen
          key={screen.id}
          name={
            screen.name as keyof RootStackParamList[
              | 'Settings'
              | 'Details'
              | 'EventPage'
              | 'CommunityNewsPage'
              | 'Scanner'
              | 'Profile'
              | 'Servicing'
              | 'JobsList'
              | 'Forms'
              | 'WebViewPage']
          }
          component={screen.component as React.ComponentType}
          options={screen.options as DrawerNavigationOptions}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
