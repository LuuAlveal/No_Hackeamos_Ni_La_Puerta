import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';

export default function infOpc() {
  const navigation = useNavigation();
  const [mesa, setMesa] = useState({
    profesor: 'Juan Pérez',
    fecha: '15/11/2024',
    hora: '10:00 hs',
    materia: 'Programación',
  });
  const [inscrito, setInscrito] = useState(false);

  const handleInscripcion = () => {
   
    setInscrito(true);
    Swal.fire({
      title: '¡Inscripción exitosa!',
      text: 'Te has inscrito correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      navigation.navigate('');
    });
  };

  return (
    <ImageBackground
      source={require('../assets/epet20fondo.png')}
      resizeMode={'cover'}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Información de la Mesa</Text>
          <Text style={styles.info}>Profesor: {mesa.profesor}</Text>
          <Text style={styles.info}>Fecha: {mesa.fecha}</Text>
          <Text style={styles.info}>Hora: {mesa.hora}</Text>
          <Text style={styles.info}>Materia: {mesa.materia}</Text>
          {inscrito ? (
            <Text style={styles.info}>¡Ya estás inscrito!</Text>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleInscripcion}>
              <Text style={styles.buttonText}>Inscribirse</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: 'rgba(249, 249, 249, 0.5)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});