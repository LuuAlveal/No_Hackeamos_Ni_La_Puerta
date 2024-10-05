import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'; 
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AsigMatAlum(props) {
 /*   const [alumno, setAlumno] = useState({ nombre: '', apellido: '', dni: '',year:'' });
    const [selectedYear, setSelectedYear] = useState("default");
    //Leer el document del alumno
    const getAlumnoById = async (id) => {
        const alumnoRef = doc(BD, 'alumnos', id);
        const docSnap = await getDoc(alumnoRef);
        if (docSnap.exists()) {
            setAlumno(docSnap.data());
            setSelectedYear(docSnap.data().year);
        } else {
            console.log("No se encontró el documento del usuario");
        }
    };

    //Recuperar el Id del alumno
    useEffect(() => {
        if (props.route.params.idAlumno) {
            getAlumnoById(props.route.params.idAlumno);
        }
    }, [props.route.params.idAlumno]);

    //Act. Alumno funcion
    const ActAlum = async () => {
        const alumnoRef = doc(BD, 'alumnos', props.route.params.idAlumno);
        try {
            await updateDoc(alumnoRef, {
                nombre: alumno.nombre,
                apellido: alumno.apellido,
                dni: alumno.dni,
                year: selectedYear
            });
            Swal.fire({
                title: 'Alumno actualizado exitosamente',
                icon: 'success'
            })
        } catch (error) {
            Swal.fire({
                error: 'Error',
                title:'No se pudo modificar el alumno',
                icon: 'error'
            })
            console.log(error)
        }
    };
*/
    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {
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
        backgroundImage: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modificarAlumno: {
            fontSize: 18,
            fontFamily: 'sans-serif',
            textAlign: 'center'
        },
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 10,
            marginTop: 2,
            borderColor: 'white',
        },
        containerButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150,
            marginHorizontal: 10
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        }
    });

    return (
        
        <ImageBackground
            source={require('../assets/epet20fondo.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
                

            <View style={style.form}>
                <Text style={style.modificarAlumno}>Asignar MATERIAS</Text>

                <Text style={{ fontSize: 15 }}> Cuantas materias va a rendir</Text>

                <Picker
                    style={style.cajaIng}
                >
                    <Picker.Item label="Seleccione las materias" value="default" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    
                </Picker>

                <Text style={{ fontSize: 15 }}>Seleccione </Text>
                
                <Picker
                    style={style.cajaIng}
                >
                    <Picker.Item label="Ninguna materia seleccionada" value="default" />
                    <Picker.Item label="Matematica" value="Matematica" />
                    <Picker.Item label="Lengua y literatura" value="Lengua y literatura" />
                    <Picker.Item label="Civica" value="Civica" />
                    <Picker.Item label="Historia" value="Historia" />
                    <Picker.Item label="Fisica" value="Fisica" />
                    <Picker.Item label="Logica" value="Logica" />
                </Picker>

                <Picker
                    style={style.cajaIng}
                >
                    <Picker.Item label="Ninguna materia seleccionada" value="default" />
                    <Picker.Item label="Matematica" value="Matematica" />
                    <Picker.Item label="Lengua y literatura" value="Lengua y literatura" />
                    <Picker.Item label="Civica" value="Civica" />
                    <Picker.Item label="Historia" value="Historia" />
                    <Picker.Item label="Fisica" value="Fisica" />
                    <Picker.Item label="Logica" value="Logica" />
                </Picker>

                <Picker
                    style={style.cajaIng}
                >
                    <Picker.Item label="Ninguna materia seleccionada" value="default" />
                    <Picker.Item label="Matematica" value="Matematica" />
                    <Picker.Item label="Lengua y literatura" value="Lengua y literatura" />
                    <Picker.Item label="Civica" value="Civica" />
                    <Picker.Item label="Historia" value="Historia" />
                    <Picker.Item label="Fisica" value="Fisica" />
                    <Picker.Item label="Logica" value="Logica" />
                </Picker>

                
                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button}  >
                        <Text style={style.textButton}>Asignar Materia</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
