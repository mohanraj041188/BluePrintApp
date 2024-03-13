import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './application/view/LoginScreen';
import Userpage from './application/view/user/UserScreen';
import AdminHome from './application/view/admin/AdminScreen';

const Stack = createNativeStackNavigator();

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <NavigationContainer style={{ backgroundColor: 'transparent' }}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={
            { headerShown: false }
          } name="Login" component={LoginPage} />
        <Stack.Screen options={
            { 
              headerTintColor: '#ffffff',
              headerTransparent: false,
              headerStyle: {
                backgroundColor: 'transparent'
              },
              headerTitleStyle: {
                color: 'white'
              }
            }
          } name="Userpage" component={Userpage} />
        <Stack.Screen options={
            { 
              headerTintColor: '#ffffff',
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'transparent'
              },
              headerTitleStyle: {
                color: '#ffffff'
              }
            }
          } name="AdminHome" component={AdminHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;