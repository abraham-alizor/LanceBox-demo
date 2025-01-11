import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStacksParameterList} from './types';
import Login from '@/screens/Auth/Login';
import Signup from '@/screens/Auth/Login';
import {SafeAreaView} from '@/shared/components/SafeAreaView';

const Stack = createNativeStackNavigator<AuthStacksParameterList>();

export default function AuthenticationStack() {
  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_left',
          animationDuration: 50,
          //   contentStyle: { backgroundColor: "#0033AA" },
          gestureEnabled: false,
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
