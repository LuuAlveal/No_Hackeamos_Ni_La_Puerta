import React from 'react';
import 'react-native-gesture-handler';
import { Button } from 'react-native';
import appFirebase from '../firebase';
import { getAuth, signOut } from 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Opciones from '../screens/Opciones';
import Ayuda from '../screens/Ayuda';
import InfOpc from '../screens/infOpc';
import Ajustes from '../screens/Ajustes';
import Creditos from '../screens/Creditos';
import Admin from '../Admin-Screens/Admin';
import ListAlum from '../Admin-Screens/ListAlum';
import AgregarMaterias from '../Admin-Screens/AgregarMaterias';
import ListMaterias from '../Admin-Screens/ListMaterias';
import ModificarAlumno from '../Admin-Screens/ModificarAlumno';
import ModificarMaterias from '../Admin-Screens/ModificarMaterias';
import AsigMatAlum from '../Admin-Screens/AsigMatAlum';
const Stack = createStackNavigator();
const auth = getAuth(appFirebase);

export default function MyStack() {
  const navigation = useNavigation();
  const CerrarSesion = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error("Error al cerrar sesion: ", error)
      })
  }

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          }
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          },
          headerLeft: () => {
            return (
              <Button
                onPress={CerrarSesion}
                title="Salir"
                color="#304A6E"
              />
            );
          },
          headerRight: () => {
            return (
              <Button
                onPress={() => navigation.navigate('Ajustes')}
                title="Ajustes"
                color="#304A6E"
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Opciones"
        component={Opciones}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          },
          headerRight: () => {
            return (
              <Button
                onPress={() => navigation.navigate('Ajustes')}
                title="Ajustes"
                color="#304A6E"
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Ayuda"
        component={Ayuda}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="infOpc"
        component={InfOpc}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
          headerRight: () => {
            return (
              <Button
                onPress={() => navigation.navigate('Ajustes')}
                title="Ajustes"
                color="#304A6E"
              />
            );
          }
        }}
      />
      <Stack.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
        }}
      />
      <Stack.Screen
        name="Creditos"
        component={Creditos}
        options={{
          title: "E.P.E.T N 20",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />

      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="ListAlum"
        component={ListAlum}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="AgregarMaterias"
        component={AgregarMaterias}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="ListMaterias"
        component={ListMaterias}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="ModificarAlumno"
        component={ModificarAlumno}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="ModificarMaterias"
        component={ModificarMaterias}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
      <Stack.Screen
        name="AsigMatAlum"
        component={AsigMatAlum}
        options={{
          title: "E.P.E.T N 20 - Admins",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E'
          }
        }}
      />
    </Stack.Navigator>
  );

}