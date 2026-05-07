import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeycloakProvider } from './src/context/KeycloakContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <KeycloakProvider>
        <AppNavigator />
      </KeycloakProvider>
    </SafeAreaProvider>
  );
}