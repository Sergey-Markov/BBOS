import { useBackHandler } from '@react-native-community/hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IScreenProps, RootStackParamList } from '../interfaces';

import Chat from './Chat/Chat';
import Home from './Home/Home';
import News from './News/News';
import Posts from './Posts/Posts';

type TBottomScreens = 'Home' | 'Posts' | 'Chat' | 'News';
type TTabOptions = {
  id: number;
  name: TBottomScreens;
  component: React.ComponentType<any>;
  icon: string;
}[];

const Tabs: TTabOptions = [
  {
    id: 1,
    name: 'Home',
    component: Home,
    icon: 'home',
  },
  {
    id: 2,
    name: 'Posts',
    component: Posts,
    icon: 'albums',
  },
  {
    id: 3,
    name: 'Chat',
    component: Chat,
    icon: 'chatbox-ellipses',
  },
  {
    id: 4,
    name: 'News',
    component: News,
    icon: 'newspaper',
  },
];
const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomNavigation = ({ navigation, route }: IScreenProps<'Main'>) => {
  useBackHandler(() => {
    if (route.params?.screen !== 'Home') {
      navigation.navigate('Home');
      navigation.setOptions({
        title: 'Home',
      });
      return true;
    }
    return false;
  });

  return (
    <Tab.Navigator>
      {Tabs.map((tab) => {
        return (
          <Tab.Screen
            key={tab.id}
            name={tab.name}
            component={tab.component}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name={tab.icon} color={color} size={size} />
              ),
              tabBarInactiveTintColor: 'grey',
              tabBarActiveTintColor: '#f4511e',
              tabBarStyle: {
                height: 70,
                paddingTop: 3,
                paddingBottom: 20,
              },
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate(tab.name);
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
