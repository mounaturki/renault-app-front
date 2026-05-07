import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';

import HomeScreen from '../screens/HomeScreen';
import PlateTypeScreen from '../screens/PlateTypeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import VehicleInfoScreen from '../screens/VehicleInfoScreen';
import ManualFormScreen from '../screens/ManualFormScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#8B0000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PlateType"
          component={PlateTypeScreen}
          options={{ title: 'Ajouter un véhicule' }}
        />

        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{ title: 'Scanner la plaque' }}
        />

        <Stack.Screen
          name="VehicleInfo"
          component={VehicleInfoScreen}
          options={{ title: 'Informations véhicule' }}
        />

        <Stack.Screen
          name="ManualForm"
          component={ManualFormScreen}
          options={{ title: 'Saisie manuelle' }}
        />

        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ title: 'Confirmation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}