import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground,  TextInput, TouchableOpacity} from 'react-native';
import { getFirestore,addDoc, collection   } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
const BD = getFirestore(appFirebase);

export default function AgregarMesas() {
    const navigation = useNavigation();
    const [selectedName, setSelectedName] = useState("default");
    const [selectedProfesor, setSelectedProfesor] = useState("default");
    const [selectedYear, setSelectedYear] = useState("default");
    const [state, setState] = useState({
        nombre: "",
        profesor: "",
        fecha: new Date()
    })
    const [startDate, setStartDate] = useState(new Date());
    const mesasPorAño = {
        '1°': [
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
        '2°': [
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
        '3°': [
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
        '4°': [
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
        '5°': [
            { label: 'Ciencia - Tecnologia e Informacion', value: 'Ciencia - Tecnologia e Informacion' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'Estadística y Probabilidad', value: 'Estadística y Probabilidad' },
            { label: 'Inglés Técnico II', value: 'Inglés Técnico II' },
            { label: 'Organización y Arquitectura I', value: 'Organización y Arquitectura I' },
            { label: 'Practicas Profesionalizantes', value: 'Practicas Profesionalizantes' }, //PREGUNTAR EL NOMBRE CORRECTO
            { label: 'Principios de Testing', value: 'Principios de Testing' },
            { label: 'Programación Web Estática y Laboratorio Web', value: 'Programación Web Estática y Laboratorio Web' },
            { label: 'Sistemas Operativos I', value: 'Sistemas Operativos I' },
            { label: 'Taller', value: 'Taller' },
            { label: 'Técnicas Avanzadas de Programación', value: 'Técnicas Avanzadas de Programación' },
            { label: 'Tecnología de Redes I', value: 'Tecnología de Redes I' },
        ],
        '6°': [
            { label: 'Computación Gráfica', value: 'Computación Gráfica' },
            { label: 'Educación Física', value: 'Educación Física' },
            { label: 'Etica y Deontologia Profesional', value: 'Etica y Deontologia Profesional' }, //Agregar Practicas profecionalizantes
            { label: 'Ingles Tecnico III', value: 'Ingles Tecnico III' },
            { label: 'Introducción a la Automatización y Control', value: 'Introducción a la Automatización y Control' },
            { label: 'Organización y Arquitectura II', value: 'Organización y Arquitectura II' },
            { label: 'Programación Web Dinámica', value: 'Programación Web Dinámica' },
            { label: 'Seguridad Informática', value: 'Seguridad Informática' },
            { label: 'Sistemas de Gestión de Calidad de Software', value: 'Sistemas de Gestión de Calidad de Software' },
            { label: 'Sistemas Operativos II', value: 'Sistemas Operativos II' },
            { label: 'Taller', value: 'Taller' },
            { label: 'Tecnología de Redes II', value: 'Tecnología de Redes II' }
        ]
    };
    const profesorPorMesas = {
        'Biología' : [
            { label: 'Liliana Aquito', value: 'Liliana Aquito' },
            { label: 'Mariana Navoni', value: 'Mariana Navoni' }
        ],
        'Construccion de la Ciudadanía' : [
            { label: 'Nazareno Miles', value: 'Nazareno Miles' },
            { label: 'Rodriguez Barozi', value: 'Rodriguez Barozi' }
        ],
        'Dibujo Técnico I' : [
            { label: 'Leonardo Solalinde', value: 'Leonardo Solalinde' },
            { label: 'Romina Maldonado', value: 'Romina Maldonado' },
            { label: 'Rocio Infante', value: 'Rocio Infante' }
        ],
        'Educación Física' : [
            { label: 'Jorge Cardenas', value: 'Jorge Cardenas' },
            { label: 'Graciana Franzoni', value: 'Graciana Franzoni' },
            { label: 'Alejandra Prado', value: 'Alejandra Prado' }
        ],
        'ESI I' : [
            { label: 'Sabrina Olmedo', value: 'Sabrina Olmedo' },
            { label: 'Erika Cuello', value: 'Erika Cuello' }
        ],
        'Filosofía I' : [
            { label: 'Maria Nidia Heit', value: 'Maria Nidia Heit' },
            { label: 'Jessica Miranda', value: 'Jessica Miranda' }
        ],
        'Fisicoquímica' : [
            { label: 'Carla Parada', value: 'Carla Parada' },
            { label: 'Juan Jose Romero', value: 'Juan Jose Romero' }
        ],
        'Geografía I' : [
            { label: 'Ludmila Pereira', value: 'Ludmila Pereira' },
            { label: 'Ludmila Sena', value: 'Ludmila Sena' },
            { label: 'Lorena Apablaza', value: 'Lorena Apablaza' }
        ],
        'Historia I' : [
            { label: 'Hector Oriz', value: 'Hector Oriz' },
            { label: 'Lucas Martilano', value: 'Lucas Martilano' }
        ],
        'Informatica I' : [
            { label: 'Daniel Gualda', value: 'Daniel Gualda' },
            { label: 'Giselle Balboa', value: 'Giselle Balboa' }
        ],
        'Ingles I' : [
            { label: 'Sofia Katz', value: 'Sofia Katz' },
            { label: 'Florencia Castro', value: 'Florencia Castro' },
            { label: 'Carolina Salinas', value: 'Carolina Salinas' }
        ],
        'Lengua I' : [
            { label: 'Fabiana Ferreyra', value: 'Fabiana Ferreyra' },
            { label: 'Florencia Beltran', value: 'Florencia Beltran' },
            { label: 'Luciana Chazarreta', value: 'Luciana Chazarreta' }
        ],
        'Literatura I' : [
            { label: 'Fabiana Ferreyra', value: 'Fabiana Ferreyra' },
            { label: 'Florencia Beltran', value: 'Florencia Beltran' },
            { label: 'Luciana Chazarreta', value: 'Luciana Chazarreta' }
        ],
        'Matemática I' : [
            { label: 'Vanesa Merkel', value: 'Vanesa Merkel' },
            { label: 'Lilen Garcia Guilbert', value: 'Lilen Garcia Guilbert' },
            { label: 'Belen Gerez', value: 'Belen Gerez' }
        ],
        'Música' : [
            { label: 'Pablo Barcena', value: 'Pablo Barcena' }
        ],
        'Taller' : [
            { label: '', value: '' },
            { label: '', value: '' },
            { label: '', value: '' }
        ],
        'Teatro' : [
            { label: 'Victoria Romero', value: 'Victoria Romero' },
            { label: 'Daniela Jaime Flores', value: 'Daniela Jaime Flores' }
        ] 
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };
    const handleDateChange = (date) => {
        const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
        if (isWeekday) {
            setStartDate(date);
            setState({ ...state, fecha: formatDate(date) });
        }
    };
    const isDateValid = (date) => {
        return date >= new Date();
    };
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    };
    const handleMesasAño = async () => {
        const subjectOptions = mesasPorAño[selectedYear] || [];
        try {
            await addDoc(collection(BD, 'mesas'), {
                nombre: selectedName,
                profesor: selectedProfesor,
                fecha: state.fecha.toString(), 
                year: selectedYear,
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
        }else if (selectedProfesor === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese el profesor',
                icon: 'warning',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.fecha === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese la fecha',
                icon: 'error',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
        }else {
            try {
                await addDoc(collection(BD, 'mesas'), {
                    nombre: selectedName,
                    profesor: selectedProfesor,
                    fecha: state.fecha,
                    year: selectedYear
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
                        <Picker.Item label="1° año" value="1°" />
                        <Picker.Item label="2° año" value="2°" />
                        <Picker.Item label="3° año" value="3°" />
                        <Picker.Item label="4° año" value="4°" />
                        <Picker.Item label="5° año" value="5°" />
                        <Picker.Item label="6° año" value="6°" />
                    </Picker>
                    </View>

                    <Text style={{ fontSize: 15 }}>Nombre</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedName}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedName(itemValue)
                            setSelectedProfesor('default')
                        }}
                        style={{ paddingHorizontal: 15, borderColor: 'white'}}
                    >
                        <Picker.Item label="Nombre de la materia" value="default" />
                        {selectedYear !== 'default' && mesasPorAño[selectedYear].map((subject) => (
                        <Picker.Item key={subject.value} label={subject.label} value={subject.value} />
                        ))}
                    </Picker>
                    </View>

                    <Text style={{ fontSize: 15 }}>Profesor</Text>
                    <View style={style.cajaIng}>
                    <Picker
                        selectedValue={selectedProfesor}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedProfesor(itemValue)
                        }
                        style={{ paddingHorizontal: 15, borderColor: 'white'}}
                    >
                        <Picker.Item label="Nombre de la mesa" value="default" />
                        {selectedName !== 'default' && profesorPorMesas[selectedName].map((subject) => (
                        <Picker.Item key={subject.value} label={subject.label} value={subject.value} />
                        ))}
                    </Picker>
                    </View>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker/>
                    </LocalizationProvider>

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
