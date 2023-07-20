import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../interfaces';

import Login from './Login/Login';
import Registration from './Registration/Registration';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
