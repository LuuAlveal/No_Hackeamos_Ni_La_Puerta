import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground,  TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AgregarMesas() {
    const navigation = useNavigation();
    const [selectedName, setSelectedName] = useState("default");
    const [selectedYear, setSelectedYear] = useState("default");
    const [state, setState] = useState({
        nombre: "",
        profesor: "",
        fecha: "",
        estado:"ACTIVO"
    })
    const mesasPorAño = {
        '1': [
            { label: 'Biología', value: 'Biología' },
            { label: 'Construccion de la Ciudadanía', value: 'Construccion de la Ciudadanía' },
            { label: 'Dibujo Técnico I', value: 'Dibujo Técnico I' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'ESI I', value: 'ESI I' },
            { label: 'Filosofía I', value: 'Filosofía I' },
            { label: 'Fisicoquímica', value: 'Fisicoquímica' },
            { label: 'Geografía I', value: 'Geografía I' },
            { label: 'Historia I', value: 'Historia I' },
            { label: 'Informatica I', value: 'Informatica I' },
            { label: 'Ingles I', value: 'Ingles I' },
            { label: 'Lengua I', value: 'Lengua I' },
            { label: 'Literatura I', value: 'Literatura I' },
            { label: 'Matemática I', value: 'Matemática I' },
            { label: 'Música', value: 'Música' },
            { label: 'Taller', value: 'Taller' },
            { label: 'Teatro', value: 'Teatro' }
        ],
        '2': [
            { label: 'Biología e Higiene', value: 'Biología e Higiene' },
            { label: 'Dibujo Técnico II', value: 'Dibujo Técnico II' },
            { label: 'Economía II', value: 'Economía II' },
            { label: 'Educación Cívica', value: 'Educación Cívica' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'ESI II', value: 'ESI II' },
            { label: 'Filosofía II', value: 'Filosofía II' },
            { label: 'Física II', value: 'Física II' },
            { label: 'Geografía II', value: 'Geografía II' },
            { label: 'Historia II', value: 'Historia II' },
            { label: 'Informática II', value: 'Informática II' },
            { label: 'Inglés II', value: 'Inglés II' },
            { label: 'Lengua II', value: 'Lengua II' },
            { label: 'Literatura II', value: 'Literatura II' },
            { label: 'Matemática II', value: 'Matemática II' },
            { label: 'Taller', value: 'Taller' },
            { label: 'Teatro II', value: 'Teatro II' }
        ],
        '3': [
            { label: 'Dibujo Tecnico III', value: 'Dibujo Tecnico III' },
            { label: 'Educación Cívica II', value: 'Educación Cívica II' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'Física III', value: 'Física III' },
            { label: 'Geografía III', value: 'Geografía III' },
            { label: 'Historia III', value: 'Historia III' },
            { label: 'Inglés III', value: 'Inglés III' },
            { label: 'Lengua y Literatura', value: 'Lengua y Literatura' },
            { label: 'Matemática III', value: 'Matemática III' },
            { label: 'Química', value: 'Química' },
            { label: 'Taller', value: 'Taller' }
        ],
        '4': [
            { label: 'Análisis Matemático', value: 'Análisis Matemático' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'Física IV', value: 'Física IV' },
            { label: 'Inglés Técnico I', value: 'Inglés Técnico I' },
            { label: 'Instruccion Civica', value: 'Instruccion Civica' },
            { label: 'Introducción a la Base de Datos', value: 'Introducción a la Base de Datos' },
            { label: 'Introducción a la Programación', value: 'Introducción a la Programación' },
            { label: 'Literatura IV', value: 'Literatura IV' },
            { label: 'Lógica', value: 'Lógica' },
            { label: 'Química Aplicada', value: 'Química Aplicada' },
            { label: 'Taller ', value: 'Taller ' },
        ],
        '5': [
            { label: 'Ciencia - Tecnologia e Informacion', value: 'Ciencia - Tecnologia e Informacion' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'Estadística y Probabilidad', value: 'Estadística y Probabilidad' },
            { label: 'Inglés Técnico II', value: 'Inglés Técnico II' },
            { label: 'Organización y Arquitectura I', value: 'Organización y Arquitectura I' },
            { label: 'Practicas Profesionalizantes', value: 'Practicas Profesionalizantes' },
            { label: 'Principios de Testing', value: 'Principios de Testing' },
            { label: 'Programación Web Estática y Laboratorio Web', value: 'Programación Web Estática y Laboratorio Web' },
            { label: 'Sistemas Operativos I', value: 'Sistemas Operativos I' },
            { label: 'Taller', value: 'Taller' },
            { label: 'Técnicas Avanzadas de Programación', value: 'Técnicas Avanzadas de Programación' },
            { label: 'Tecnología de Redes I', value: 'Tecnología de Redes I' },
        ],
        '6': [
            { label: 'Computación Gráfica', value: 'Computación Gráfica' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'Etica y Deontologia Profesional', value: 'Etica y Deontologia Profesional' },
            { label: 'Ingles Tecnico III', value: 'Ingles Tecnico III' },
            { label: 'Introducción a la Automatización y Control', value: 'Introducción a la Automatización y Control' },
            { label: 'Organización y Arquitectura II', value: 'Organización y Arquitectura II' },
            { label: 'Pasantias', value: 'Pasantias' },
            { label: 'Programación Web Dinámica', value: 'Programación Web Dinámica' },
            { label: 'Seguridad Informática', value: 'Seguridad Informática' },
            { label: 'Sistemas de Gestión de Calidad de Software', value: 'Sistemas de Gestión de Calidad de Software' },
            { label: 'Sistemas Operativos II', value: 'Sistemas Operativos II' },
            { label: 'Taller', value: 'Taller' },
            { label: 'Tecnología de Redes II', value: 'Tecnología de Redes II' }
        ]
    };
    const fechasPredeterminadas = {
        'Biología': '02/12/2024 08:00',
        'Construccion de la Ciudadanía': '02/12/2024 13:30' ,
        'Dibujo Técnico I': '02/12/2024 08:00' ,
        'Educación Física': '02/12/2024 13:30' ,
        'ESI I': '02/12/2024 08:00' ,
        'Filosofía I': '02/12/2024 13:30' ,
        'Fisicoquímica': '02/12/2024 08:00' ,
        'Geografía I': '02/12/2024 13:30' ,
        'Historia I': '02/12/2024 08:00' ,
        'Informatica I': '02/12/2024 13:30' ,
        'Ingles I': '03/12/2024 08:00' ,
        'Lengua I': '03/12/2024 13:30' ,
        'Literatura I': '03/12/2024 08:00' ,
        'Matemática I': '03/12/2024 13:30' ,
        'Música': '03/12/2024 08:00' ,
        'Taller': '03/12/2024 13:30' ,
        'Teatro': '03/12/2024 08:00' ,
        'Biología e Higiene': '03/12/2024 13:30' ,
        'Dibujo Técnico II': '04/12/2024 08:00' ,
        'Economía II': '04/12/2024 13:30' ,
        'Educación Cívica': '04/12/2024 08:00' ,
        'ESI II': '04/12/2024 13:30' ,
        'Filosofía II': '04/12/2024 08:00' ,
        'Física II': '04/12/2024 13:30' ,
        'Geografía II': '04/12/2024 08:00' ,
        'Historia II': '04/12/2024 13:30' ,
        'Informática II': '05/12/2024 08:00' ,
        'Inglés II': '05/12/2024 13:30' ,
        'Lengua II': '05/12/2024 08:00' ,
        'Literatura II': '05/12/2024 13:30' ,
        'Matemática II': '05/12/2024 08:00' ,
        'Teatro II': '05/12/2024 13:30' ,
        'Dibujo Tecnico III': '05/12/2024 08:00' ,
        'Educación Cívica II': '05/12/2024 13:30' ,
        'Física III': '09/12/2024 08:00' ,
        'Geografía III': '09/12/2024 13:30' ,
        'Historia III': '09/12/2024 08:00' ,
        'Inglés III': '09/12/2024 13:30' ,
        'Lengua y Literatura': '09/12/2024 08:00' ,
        'Matemática III': '09/12/2024 13:30' ,
        'Química': '09/12/2024 08:00' ,
        'Análisis Matemático': '09/12/2024 18:00' ,
        'Física IV': '09/12/2024 18:00' ,
        'Inglés Técnico I': '09/12/2024 18:00' ,
        'Instruccion Civica': '10/12/2024 18:00' ,
        'Introducción a la Base de Datos': '10/12/2024 18:00' ,
        'Introducción a la Programación': '10/12/2024 18:00' ,
        'Literatura IV': '11/12/2024 18:00' ,
        'Lógica': '11/12/2024 18:00' ,
        'Química Aplicada': '11/12/2024 18:00' ,
        'Ciencia - Tecnologia e Informacion': '12/12/2024 18:00' ,
        'Estadística y Probabilidad': '12/12/2024 18:00' ,
        'Inglés Técnico II': '12/12/2024 18:00' ,
        'Organización y Arquitectura I': '13/12/2024 18:00' ,
        'Practicas Profesionalizantes': '13/12/2024 18:00' ,
        'Principios de Testing': '13/12/2024 18:00' ,
        'Programación Web Estática y Laboratorio Web': '16/12/2024 18:00' ,
        'Sistemas Operativos I': '16/12/2024 18:00' ,
        'Técnicas Avanzadas de Programación': '16/12/2024 18:00' ,
        'Tecnología de Redes I': '16/12/2024 18:00' ,
        'Computación Gráfica': '17/12/2024 18:00' ,
        'Etica y Deontologia Profesional': '17/12/2024 18:00' ,
        'Ingles Tecnico III': '17/12/2024 18:00' ,
        'Introducción a la Automatización y Control': '02/12/2024 18:00' ,
        'Organización y Arquitectura II': '02/12/2024 18:00' ,
        'Pasantias': '02/12/2024 18:00' ,
        'Programación Web Dinámica': '03/12/2024 18:00' ,
        'Seguridad Informática': '03/12/2024 18:00' ,
        'Sistemas de Gestión de Calidad de Software': '03/12/2024 18:00' ,
        'Sistemas Operativos II': '03/12/2024 18:00' ,
        'Tecnología de Redes II': '03/12/2024 18:00' 
    };
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    };
    const handleMesasAño = async () => {
        const subjectOptions = mesasPorAño[selectedYear] || [];
        try {
            await addDoc(collection(BD, 'mesas'), {
                nombre: selectedName,
                profesor: state.profesor,
                year: selectedYear,
                fecha: state.fecha,
                estado: state.estado
            });
            Swal.fire({
                title: 'Mesa Agregada Exitosamente',
                icon: 'success',
                timer: '2000',               
                backdrop: false, 
                allowOutsideClick: false 
            });
            navigation.navigate('ListaMesas');
        } catch (error) {
        console.log(error);
        }
    };
    const handleCreateMesas = async () => {
        if (selectedYear === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Debe seleccionar un año',
                icon: 'error',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (selectedName === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el nombre de la Materia',
                icon: 'warning',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
        }else if (state.profesor === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el nombre del profesor',
                icon: 'warning',          
                backdrop: false, 
                allowOutsideClick: false 
            })
        }else {
            try {
                await addDoc(collection(BD, 'mesas'), {
                    nombre: selectedName,
                    profesor: state.profesor,
                    year: selectedYear,
                    fecha: state.fecha,
                    estado: state.estado
                });
                Swal.fire({
                    title: 'Mesa Creada Exitosamente',
                    icon: 'success',
                    timer: '2000',                 
                    backdrop: false, 
                    allowOutsideClick: false 
                })
                navigation.navigate('ListaMesas');
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
        agregarMesa: {
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
                    <Text style={style.agregarMesa}>Agregar Mesa</Text>
                    <Text style={{ fontSize: 15 }}>Año</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedYear(itemValue)
                            setSelectedName('default')
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

                    <Text style={{ fontSize: 15 }}>Nombre</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedName}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedName(itemValue);
                            if (itemValue in fechasPredeterminadas) {
                                setState({ ...state, fecha: fechasPredeterminadas[itemValue] });
                            } else {
                                setState({ ...state, fecha: '' });
                            }
                        }}
                        style={{ paddingHorizontal: 15, borderColor: 'white'}}
                    >
                        <Picker.Item label="Nombre de la Materia" value="default" />
                        {selectedYear !== 'default' && mesasPorAño[selectedYear].map((subject) => (
                        <Picker.Item key={subject.value} label={subject.label} value={subject.value} />
                        ))}
                    </Picker>
                    </View>

                    <Text style={{ fontSize: 15 }}>Profesor</Text>
                    <View style={style.cajaIng}>
                    <TextInput
                            placeholder='Nombre del Profesor' 
                            style={{ paddingHorizontal: 15, outline: 0 }}
                            onChangeText={(value) => handleChangeText('profesor', value)}
                        />
                    </View>

                    <View style={style.containerButton}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={handleCreateMesas}
                        >
                            <Text style={style.textButton}>
                                Agregar Mesa
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
