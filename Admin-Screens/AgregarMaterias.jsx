import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const BD = getFirestore(appFirebase);

export default function AgregarMaterias() {
    const navigation = useNavigation();
    const [selectedName, setSelectedName] = useState("default");
    const [selectedYear, setSelectedYear] = useState("default");
    const [state, setState] = useState({
        nombre: "",
        profesor: "",
        fecha: new Date()
    })
    const [startDate, setStartDate] = useState(new Date());
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }
    const handleDateChange = (date) => {
        setStartDate(date);
        setState({ ...state, fecha: formatDate(date) });
    };
    const isDateValid = (date) => {
        return date >= new Date();
    };
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
                await addDoc(collection(BD, 'materias'), {
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
        agregarMateria: {
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
                    <Text style={style.agregarMateria}>Agregar Materia</Text>

                    <Text style={{ fontSize: 15 }}>Nombre</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedName}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedName(itemValue)
                        }
                        style={{ paddingHorizontal: 15, borderColor: 'white'}}
                    >
                        <Picker.Item label="Nombre de la materia" value="default" />
                        <Picker.Item label="Matematicas I - II - III" value="Matematicas" />
                        <Picker.Item label="Analisis Matematico" value="Analisis Matematico" />
                        <Picker.Item label="Educacion Fisica" value="Educacion Fisica" />
                        <Picker.Item label="Historia I - II - III" value="Historia" />
                        <Picker.Item label="Geografia I - II" value="Geografia" />
                        <Picker.Item label="Fisica I - II" value="Fisica" />
                    </Picker>
                    </View>

                    <Text style={{ fontSize: 15 }}>Profesor</Text>
                    <View style={style.cajaIng}>
                        <TextInput
                            placeholder='Profesor de la materia'
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('profesor', value)}
                        />
                    </View>

                    <Text style={{ fontSize: 15 }}>Fecha</Text>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/YY"
                            minDate={new Date()}
                            filterDate={isDateValid}
                            style={{ paddingHorizontal: 15, borderWidth: 0}}
                        />

                    <Text style={{ fontSize: 15 }}>Año</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedYear(itemValue)
                        }
                        style={{ paddingHorizontal: 15, borderColor: 'white'}}
                    >
                        <Picker.Item label="Seleccione el año de la materia" value="default" />
                        <Picker.Item label="1° año" value="1°" />
                        <Picker.Item label="2° año" value="2°" />
                        <Picker.Item label="3° año" value="3°" />
                        <Picker.Item label="4° año" value="4°" />
                        <Picker.Item label="5° año" value="5°" />
                        <Picker.Item label="6° año" value="6°" />
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
