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
  const [Historial, setHistorial] = useState([]);
  const [MateriasInfo, setMateriasInfo] = useState([]);

  useEffect(() => {
    const getHistorial = async () => {
      try {
        const user = auth.currentUser;
        const alumnoRef = doc(BD, 'alumnos', user.uid);
        const docSnap = await getDoc(alumnoRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const materiasUids = data.inscripto || [];
          setHistorial(materiasUids);

          const materiasInformacion = await Promise.all(materiasUids.map(async (materiaId) => {
            const materiaRef = doc(BD, 'mesas', materiaId);
            const materiaSnap = await getDoc(materiaRef);
            if (materiaSnap.exists()) {
              return { id: materiaId, ...materiaSnap.data() };
            }
          }));
          setMateriasInfo(materiasInformacion);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getHistorial();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/epet20fondo.png')}
      resizeMode={'cover'}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Text style={styles.title}>Historial de materias</Text>
          {MateriasInfo.length > 0 ? (
            MateriasInfo.map((materia, index) => (
              <TouchableOpacity key={index} style={styles.optionButton}
                onPress={() =>
                  navigation.navigate('InfHistorial', {
                    idMateria: materia.id
                  })
                }
              >
                <Text style={styles.buttonText}>{materia.nombre}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No estas anotado a ninguna.</Text>
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
    alignItems: 'center',
  },
  optionButton: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#FFFAFA',
    justifyContent: 'center',
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  }
});