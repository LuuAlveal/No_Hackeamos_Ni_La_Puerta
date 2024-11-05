import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'; 
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AsigMatAlum(props) {
    
    const [selectedYear, setSelectedYear] = useState("default");
    const [selectedSubject, setSelectedSubject] = useState("default");
    const [numberOfSubjects, setNumberOfSubjects] = useState("default");
    const [selectedYear1, setSelectedYear1] = useState("default");
    const [selectedYear2, setSelectedYear2] = useState("default");
    const [selectedYear3, setSelectedYear3] = useState("default");
    const [selectedSubject1, setSelectedSubject1] = useState("default");
    const [selectedSubject2, setSelectedSubject2] = useState("default");
    const [selectedSubject3, setSelectedSubject3] = useState("default");
    const materiasPorAño = {
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

    const añosPorMateria = {
        '1': ['1°'],
        '2': ['1°', '2°'],
        '3': ['1°', '2°', '3°'],
    };
    const asignarMateria = () => {
        if (numberOfSubjects === "default") {
            alert("Por favor, seleccione la cantidad de materias");
            return;
        }

        let materiasSeleccionadas = [];
        
        if (selectedYear1 !== "default" && selectedSubject1 !== "default") {
            materiasSeleccionadas.push({año: selectedYear1, materia: selectedSubject1});
        }
        
        if (numberOfSubjects >= "2" && selectedYear2 !== "default" && selectedSubject2 !== "default") {
            materiasSeleccionadas.push({año: selectedYear2, materia: selectedSubject2});
        }
        
        if (numberOfSubjects === "3" && selectedYear3 !== "default" && selectedSubject3 !== "default") {
            materiasSeleccionadas.push({año: selectedYear3, materia: selectedSubject3});
        }

        if (materiasSeleccionadas.length !== parseInt(numberOfSubjects)) {
            alert("Por favor, complete todas las selecciones de año y materia");
            return;
        }

    console.log(`Asignando ${numberOfSubjects} materia(s): ${selectedSubject} de ${selectedYear} año`);    

    setNumberOfSubjects("default");
    setSelectedYear("default");
    setSelectedSubject("default");
    setNumberOfSubjects("default");
        setSelectedYear1("default");
        setSelectedYear2("default");
        setSelectedYear3("default");
        setSelectedSubject1("default");
        setSelectedSubject2("default");
        setSelectedSubject3("default");
    alert("Materia(s) asignada(s) con éxito");
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
            style={style.backgroundImage}>                
            <View style={style.form}>
                <Text style={style.modificarAlumno}>Asignar MATERIAS</Text>
    
                <Text style={{ fontSize: 15 }}>Cuantas materias va a rendir</Text>
                <Picker
                    selectedValue={numberOfSubjects}
                    onValueChange={(itemValue) => {
                        setNumberOfSubjects(itemValue);
                        setSelectedYear("default"); // Resetear año al cambiar la cantidad de materias
                        setSelectedSubject("default"); // Resetear materia al cambiar la cantidad de materias
                    }}
                    style={style.cajaIng}>
                    <Picker.Item label="Seleccione las materias" value="default" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>
    
                {numberOfSubjects !== "default" && (
    <>
        <Text style={{ fontSize: 15 }}>Año</Text>
        <Picker 
            selectedValue={selectedYear1}
            onValueChange={(itemValue) => {
                setSelectedYear1(itemValue);
                setSelectedSubject1("default");
            }}
            style={style.cajaIng}>
            <Picker.Item label="Seleccione el año de la materia" value="default"/>
            {añosPorMateria[numberOfSubjects].map((year) => (
                <Picker.Item key={year} label={`${year} año`} value={year} />
            ))}
        </Picker>

        {numberOfSubjects >= "2" && (
            <Picker 
                selectedValue={selectedYear2}
                onValueChange={(itemValue) => {
                    setSelectedYear2(itemValue);
                    setSelectedSubject2("default");
                }}
                style={style.cajaIng}>
                <Picker.Item label="Seleccione el año de la materia" value="default"/>
                {añosPorMateria[numberOfSubjects].map((year) => (
                    <Picker.Item key={year} label={`${year} año`} value={year} />
                ))}
            </Picker>
        )}

        {numberOfSubjects === "3" && (
            <Picker 
                selectedValue={selectedYear3}
                onValueChange={(itemValue) => {
                    setSelectedYear3(itemValue);
                    setSelectedSubject3("default");
                }}
                style={style.cajaIng}>
                <Picker.Item label="Seleccione el año de la materia" value="default"/>
                {añosPorMateria[numberOfSubjects].map((year) => (
                    <Picker.Item key={year} label={`${year} año`} value={year} />
                ))}
            </Picker>
        )}
    </>
)}
    
    {(selectedYear1 !== "default" || selectedYear2 !== "default" || selectedYear3 !== "default") && (
    <>
        <Text style={{ fontSize: 15 }}>Materia</Text>
        {selectedYear1 !== "default" && (
            <Picker
                selectedValue={selectedSubject1}
                onValueChange={(itemValue) => setSelectedSubject1(itemValue)}
                style={style.cajaIng}>
                <Picker.Item label="Seleccione la materia" value="default" />
                {materiasPorAño[selectedYear1].map((materia) => (
                    <Picker.Item key={materia.value} label={materia.label} value={materia.value} />
                ))}
            </Picker>
        )}
        
        {selectedYear2 !== "default" && numberOfSubjects >= "2" && (
            <Picker
                selectedValue={selectedSubject2}
                onValueChange={(itemValue) => setSelectedSubject2(itemValue)}
                style={style.cajaIng}>
                <Picker.Item label="Seleccione la materia" value="default" />
                {materiasPorAño[selectedYear2].map((materia) => (
                    <Picker.Item key={materia.value} label={materia.label} value={materia.value} />
                ))}
            </Picker>
        )}

        {selectedYear3 !== "default" && numberOfSubjects === "3" && (
            <Picker
                selectedValue={selectedSubject3}
                onValueChange={(itemValue) => setSelectedSubject3(itemValue)}
                style={style.cajaIng}>
                <Picker.Item label="Seleccione la materia" value="default" />
                {materiasPorAño[selectedYear3].map((materia) => (
                    <Picker.Item key={materia.value} label={materia.label} value={materia.value} />
                ))}
            </Picker>
        )}
    </>
)}
    
                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button} onPress={asignarMateria}>
                        <Text style={style.textButton}>Asignar Materia</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );    
}
