import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

function App() {
  const {user} = useAuth();
  if (user) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {backgroundColor: '#f7f5f5'},
            }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {backgroundColor: '#f7f5f5'},
            }}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{title: 'Registration'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
