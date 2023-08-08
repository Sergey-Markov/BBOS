import { useState } from 'react';
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
import { userSelector } from '../redux/reducers/usersReducer';
import { authSelector } from '../redux/reducers/authReducer';
import { getAuthStatus } from '../redux/selectors/authSelectors/authSelectors';
import React from 'react';

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

  return (
    <NavigationContainer
      linking={linking as LinkingOptions<ParamListBase>}
      fallback={<Text>Loading...</Text>}
    >
      {authStatus === 'Authorized' ? (
        <DrawerNavigator getHeaderTitle={getHeaderTitle} />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
export default RootNavigation;
