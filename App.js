import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import useAuth from './hooks/useAuth';
import {auth} from './config/firebase';
import {signOut} from 'firebase/auth';

const Stack = createNativeStackNavigator();

function App() {
  const handleLogout = async () => {
    await signOut(auth);
  };
  const {user} = useAuth();
  if (user) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {backgroundColor: '#fafbfd'},
            }}>
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{
                title: 'Mentors',
                headerRight: () => {
                  return (
                    <TouchableOpacity onPress={handleLogout}>
                      <Icon
                        name="log-out-outline"
                        size={25}
                        color="#06aab4"
                        style={{padding: 7}}
                      />
                    </TouchableOpacity>
                  );
                },
              }}
            />
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
              contentStyle: {backgroundColor: '#fafbfd'},
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
