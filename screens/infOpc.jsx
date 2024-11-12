import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
import { doc, getDoc, getFirestore, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import appFirebase from '../firebase';
import { getAuth } from 'firebase/auth';
const BD = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
export default function InfOpc(props) {
  const navigation = useNavigation();
  const [mesa, setmesas] = useState({
    profesor: '',
    fecha: '',
    nombre: '',
  });
  const [inscrito, setInscrito] = useState(false);
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
  const handleInscripcion = async () => {
    try {
      const user = auth.currentUser;//obtener el uid del usuario
      const alumnoRef = doc(BD, 'alumnos', user.uid);//buscar el usuario por el uid
      const materiaId = props.route.params.idMateria;

      await updateDoc(alumnoRef, {
        materias: arrayRemove(materiaId),//elimina el uid del array de "materias"
        inscripto: arrayUnion(materiaId),//agrega el uid a un array nuevo "inscripto"
      });

      setInscrito(true);
      Swal.fire({
        title: '¡Inscripción exitosa!',
        text: 'Te has inscrito correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigation.navigate('Opciones');
      });
    } catch (error) {
      console.log("Error en la inscripción: ", error);
      Swal.fire({
        title: 'Error en la inscripción',
        text: 'No se pudo completar la inscripción.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
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
          <Text style={styles.info}>Materia: {mesa.nombre}</Text>
          <TouchableOpacity style={styles.button} onPress={handleInscripcion}>
            <Text style={styles.buttonText}>Inscribirse</Text>
          </TouchableOpacity>
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