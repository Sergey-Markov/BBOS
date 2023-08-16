import { useEffect, useState } from 'react';
import {
  LinkingOptions,
  NavigationContainer,
  ParamListBase,
  getFocusedRouteNameFromRoute,
  Route,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { Text } from 'react-native-paper';

import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';

import { getAuthStatus } from '../redux/selectors/authSelectors/authSelectors';
import React from 'react';
import { globalDataSelector } from '../redux/reducers/globalDataReducer';
import Spiner from '../components/shared/Spiner/Spiner';

const prefix = Linking.createURL('/');

function getHeaderTitle(route: string) {
  const routeName =
    getFocusedRouteNameFromRoute(
      route as Partial<Route<string, object | undefined>>
    ) ?? 'Home';

  switch (routeName) {
    case 'News':
      return 'News';
    case 'Posts':
      return 'Posts';
    case 'Chat':
      return 'Chat';
    default:
      return 'Home';
  }
}

const RootNavigation = () => {
  const authStatus = useSelector(getAuthStatus);
  const globalData = useSelector(globalDataSelector);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Main: {
          screens: {
            News: 'news',
            Chat: 'chat',
            Posts: 'posts',
            Home: 'home',
          },
        },
        Login: 'login',
        Registration: 'registration',
        EventPage: 'event/:id',
        Settings: 'settings',
        NotFound: '*',
      },
    },
  };
  const isFullData = Object.keys(globalData[0]).length > 0;
  const curComponent = Boolean(isFullData) ? (
    <DrawerNavigator getHeaderTitle={getHeaderTitle} />
  ) : (
    <Spiner />
  );

  return (
    <NavigationContainer
      linking={linking as LinkingOptions<ParamListBase>}
      fallback={<Text>Loading...</Text>}
    >
      {authStatus === 'Authorized' ? curComponent : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigation;
