import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import appFirebase from '../firebase';
const BD = getFirestore(appFirebase);
export default function InfHistorial(props) {
  const [mesa, setmesas] = useState({
    profesor: '',
    fecha: '',
    nombre: '',
  });
  //Leer el document de la Mesa
  const getmesasById = async (id) => {
    const mesasRef = doc(BD, 'mesas', id);
    const docSnap = await getDoc(mesasRef);
    if (docSnap.exists()) {
      setmesas(docSnap.data());
    } else {
      console.log("No se encontro el documento de la mesa");
    }
  };
  //recuperar el id de la materia 
  useEffect(() => {
    if (props.route.params.idMateria) {
      getmesasById(props.route.params.idMateria);
    }
  }, [props.route.params.idMateria]);

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
          <Text style={styles.info}>Materia: {mesa.nombre}</Text>
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
    backgroundColor: 'rgba(249, 249, 249, 0.7)',
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