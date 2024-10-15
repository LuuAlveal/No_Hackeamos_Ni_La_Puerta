import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground,  TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AgregarMaterias() {
    const navigation = useNavigation();
    const [selectedAño, setSelectedAño] = useState("default");
    const [state, setState] = useState({
        nombre: "",
        id: ""
    })
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    };
    const handleCreateMateria = async () => {
        if (state.nombre === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el nombre de la Materia',
                icon: 'warning'
            })
        }else if (selectedAño === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el año de la Materia',
                icon: 'warning'
            })
        }else {
            try {
                await addDoc(collection(BD, 'materias'), {
                    nombre: state.nombre,
                    id: selectedAño
                });
                Swal.fire({
                    title: 'Materia Creada Exitosamente',
                    icon: 'success',
                    timer: '2000',
                });
                navigation.navigate('ListaMaterias');
            } catch (error) {
                console.log(error);
            }
        };
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
        agregarMateria: {
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
                    <Text style={style.agregarMateria}>Agregar Materia</Text>
                    <Text style={{ fontSize: 15 }}>Nombre</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Nombre'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('nombre', value)}
                        />
                    </View>

                    <Text style={{ fontSize: 15 }}>Año</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedAño}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedAño(itemValue)
                        }}
                        style={{ paddingHorizontal: 15, borderColor: 'white'}}
                    >
                        <Picker.Item label="Seleccione el año de la materia" value="default"/>
                        <Picker.Item label="1° año" value="1" />
                        <Picker.Item label="2° año" value="2" />
                        <Picker.Item label="3° año" value="3" />
                        <Picker.Item label="4° año" value="4" />
                        <Picker.Item label="5° año" value="5" />
                        <Picker.Item label="6° año" value="6" />
                    </Picker>
                    </View>

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
