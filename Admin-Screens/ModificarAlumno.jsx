import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'; 
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Swal from 'sweetalert2';
import { useNavigation } from '@react-navigation/native';
const BD = getFirestore(appFirebase);

export default function ModificarAlumno(props) {
    const [alumno, setAlumno] = useState({ nombre: '', apellido: '', dni: '',year:'' });
    const [selectedYear, setSelectedYear] = useState("default");
    const navigation = useNavigation();
    //Leer el documento del alumno
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
                icon: 'success',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
        } catch (error) {
            Swal.fire({
                error: 'Error',
                title:'No se pudo modificar el alumno',
                icon: 'error',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
            console.log(error)
        }
    };

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
            height:'100vh',
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
            source={require('../assets/FondoEpetHome.jpeg')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.form}>
                <Text style={style.modificarAlumno}>Modificar Alumno</Text>

                <Text style={{ fontSize: 15 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={alumno.nombre}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setAlumno({ ...alumno, nombre: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>Apellido</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={alumno.apellido}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setAlumno({ ...alumno, apellido: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>DNI</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={alumno.dni}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        maxLength={8}
                        onChangeText={(value) => setAlumno({ ...alumno, dni: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>Año</Text>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedYear(itemValue)
                    }
                    style={style.cajaIng}
                >
                    <Picker.Item label="Seleccione su año" value="default" />
                    <Picker.Item label="1° año" value="1°" />
                    <Picker.Item label="2° año" value="2°" />
                    <Picker.Item label="3° año" value="3°" />
                    <Picker.Item label="4° año" value="4°" />
                    <Picker.Item label="5° año" value="5°" />
                    <Picker.Item label="6° año" value="6°" />
                    <Picker.Item label="Egresado" value="Egresado" />
                </Picker>
                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button} onPress={ActAlum}>
                        <Text style={style.textButton}>Modificar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate('AsigMatAlum', {idAlumno: props.route.params.idAlumno})} >
                        <Text style={style.textButton}>Asignar Materia</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
