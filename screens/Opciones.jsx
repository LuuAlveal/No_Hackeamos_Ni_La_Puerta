import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appFirebase from '../firebase';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
const BD = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
export default function Opciones() {
  const navigation = useNavigation();
  const [previas, setPrevias] = useState([]);
  const [MateriasInfo, setMateriasInfo] = useState([]);
  useEffect(() => {
    //funcion para recuperar las materias previas del alumno logueado
    const getPrevias = async () => {
      try {
        //obtener el id del usuario logueado
        const user = auth.currentUser;
        //obtener el documento del usuario logueado por su uid 
        const alumnoRef = doc(BD, 'alumnos', user.uid);
        const docSnap = await getDoc(alumnoRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const materiasUids = data.materias || []; //materias del alumno o si no tiene niguna pone un array vacio
          setPrevias(materiasUids); //guarda los uids de las materias

          //obtener la info de las materias
          const materiasInformacion = await Promise.all(materiasUids.map(async (materiaId) => {
            const materiaRef = doc(BD, 'mesas', materiaId); //obtenemos el documento de la materia
            const materiaSnap = await getDoc(materiaRef);
            if (materiaSnap.exists()) {
              return { id: materiaId, ...materiaSnap.data() }; //guardamos el id y los datos de la materia
            }
          }));
          //actualizar el estado con la materia
          setMateriasInfo(materiasInformacion);
        }
      }
      catch (error) { //muestra un error en consola si es que lo hay
        console.error(error);
      }
    };

    getPrevias(); //devolvemos las materias
  }, []);

  return (
    <ImageBackground
      source={require('../assets/epet20fondo.png')}
      resizeMode={'cover'}
      style={styles.backgroundImage}
    >

      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Text style={styles.title}>Materias Previas</Text>
          {MateriasInfo.length > 0 ? (
            MateriasInfo.map((materia, index) => (
              <TouchableOpacity key={index} style={styles.optionButton}
                onPress={() =>
                  navigation.navigate('infOpc', {
                    idMateria: materia.id
                  })
                }
              >
                <Text >{materia.nombre}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No tenes materias previas.</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsContainer: {
    margin: 20,
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  optionButton: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#FFFAFA'
  },
  title: {
    textAlign: "center",
    fontSize: 20
  }
});
