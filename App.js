import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePantalla from './pages/HomePantalla';
import InscripcionPantalla from './pages/InscripcionPantalla';

const Stack = createNativeStackNavigator();

export default function App() {
  const [datosInscripcion, setDatosInscripcion] = useState(null);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={HomePantalla} />
        <Stack.Screen name="Inscripcion">
          {(props) => (
            <InscripcionPantalla
              {...props}
              datosInscripcion={datosInscripcion}
              setDatosInscripcion={setDatosInscripcion}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}