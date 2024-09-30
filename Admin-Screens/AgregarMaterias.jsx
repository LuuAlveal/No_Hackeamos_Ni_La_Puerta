import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AgregarMaterias() {
    const navigation = useNavigation();
    const [selectedYear, setSelectedYear] = useState("default");
    const [state, setState] = useState({
        nombre: "",
        profesor: "",
        fecha: ""
    })
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const handleCreateMateria = async () => {
        if (state.nombre === '') {
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
                await addDoc(collection(BD, 'materias'), {
                    nombre: state.nombre,
                    profesor: state.profesor,
                    fecha: state.fecha,
                    year: selectedYear
                });
                Swal.fire({
                    title: 'Materia Creada Exitosamente',
                    icon: 'success',
                    timer: '2000'
                })
                navigation.navigate('ListMaterias');
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
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginVertical: 10
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
            source={require('../assets/epet20fondo.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.modificarAlumno}>Agregar Materia</Text>

                    <Text style={{ fontSize: 15 }}>Nombre</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Nombre de la Materia'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('nombre', value)}
                        />
                    </View>

                    <Text style={{ fontSize: 15 }}>Profesor</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Profesor de la materia'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('profesor', value)}
                        />
                    </View>

                    <Text style={{ fontSize: 15 }}>fecha</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Fecha de la mesa Ej: 12-03-24'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            maxLength={8}
                            onChangeText={(value) => handleChangeText('fecha', value)}
                        />
                    </View>

                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedYear(itemValue)
                        }
                        style={style.picker}
                    >
                        <Picker.Item label="Seleccione el año de la materia" value="default" />
                        <Picker.Item label="1° año" value="1°" />
                        <Picker.Item label="2° año" value="2°" />
                        <Picker.Item label="3° año" value="3°" />
                        <Picker.Item label="4° año" value="4°" />
                        <Picker.Item label="5° año" value="5°" />
                        <Picker.Item label="6° año" value="6°" />
                    </Picker>

                    <View style={style.containerButton}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={handleCreateMateria}
                        >
                            <Text style={style.textButton}>
                                Agregar Materia
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
