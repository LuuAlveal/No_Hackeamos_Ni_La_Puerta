import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function ModificarAlumno() {
    const navigation = useNavigation();
    const [selectedName, setSelectedName] = useState("default");
    const [selectedYear, setSelectedYear] = useState("default");
    const [state, setState] = useState({
        nombre: "",
        profesor: "",
        fecha: new Date()
    })
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    };
    const handleCreateMateria = async () => {
        if (selectedName === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el nombre de la Materia',
                icon: 'warning'
            })
        } else if (state.profesor === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el profesor',
                icon: 'warning'
            })
        } else if (state.fecha === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese la fecha',
                icon: 'error'
            })
        } else if (selectedYear === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su email',
                icon: 'error'
            })
        }
        else {
            try {
                await addDoc(collection(BD, 'alumnos'), {
                    nombre: selectedName,
                    profesor: state.profesor,
                    fecha: state.fecha,
                    year: selectedYear
                });
                Swal.fire({
                    title: 'Materia Creada Exitosamente',
                    icon: 'success',
                    timer: '2000'
                })
                navigation.navigate('ListAlum');
            }
            catch (error) {
                console.log(error)
            };
        }

    }

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
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modificarAlumno: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom: 20
        },        
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 10,
            marginTop: 2,
            borderColor: 'white'
        },
        containerButton: {
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150
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
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.modificarAlumno}>MODIFICAR ALUMNO</Text>
                </View>
            </View>
        </ImageBackground>
    );
}
