import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground,  TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AgregarProfesores() {
    const navigation = useNavigation();
    const [state, setState] = useState({
        nombre: "",
        apellido: "",
        materia: ""
    })
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    };
    const handleCreateProfesores = async () => {
        if (state.nombre === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el nombre del profesor',
                icon: 'warning'
            })
        }else if (state.apellido === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el apellido del profesor',
                icon: 'warning'
            })
        }else if (state.materia === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese la materia del profesor',
                icon: 'warning'
            })
        }else {
            try {
                await addDoc(collection(BD, 'profesores'), {
                    nombre: state.nombre,
                    apellido: state.apellido,
                    materia: state.materia
                });
                Swal.fire({
                    title: 'Profesor Agregado Exitosamente',
                    icon: 'success',
                    timer: '2000'
                })
                navigation.navigate('ListaProfesores');
            }
            catch (error) {
                console.log(error)
            };
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
            width: 400,
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
        agregarProfesores: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom: 20
        },        
        cajaIng: {
            paddingVertical: 10,
            paddingHorizontal: 18,
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
            style={style.backgroundImage}>
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.agregarProfesores}>Agregar Profesores</Text>
                    <Text style={{ fontSize: 15 }}>Nombre</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Nombre'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('nombre', value)}
                        />
                    </View>

                    <Text style={{ fontSize: 15 }}>Apellido/s</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Apellido/s'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('apellido', value)}
                        />
                    </View>

                    <Text style={{ fontSize: 15 }}>Materia</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Materia'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('materia', value)}
                        />
                    </View>

                    <View style={style.containerButton}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={handleCreateProfesores}
                        >
                            <Text style={style.textButton}>
                                Agregar Profesores
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}