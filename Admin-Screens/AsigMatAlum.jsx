import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc, query, collection, where, getDocs} from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);

export default function AsigMatAlum(props) {
    //estado del año y materais a seleccioanr en los pickers
    const [selectedYear1, setSelectedYear1] = useState("default");
    const [selectedYear2, setSelectedYear2] = useState("default");
    const [selectedYear3, setSelectedYear3] = useState("default");
    const [selectedSubject1, setSelectedSubject1] = useState("default");
    const [selectedSubject2, setSelectedSubject2] = useState("default");
    const [selectedSubject3, setSelectedSubject3] = useState("default");
    const [numberOfSubjects, setNumberOfSubjects] = useState("default");
    const [materiasOptions, setMateriasOptions] = useState({});

    //cargar las materias dependiendo del año seleccionado
    useEffect(() => {
        //obtener materias según el año
        const recuperarMaterias = async (year) => {
            const q = query(collection(BD, "mesas"), where("year", "==", year.toString())); //convertir el año para leerlo
            const querySnapshot = await getDocs(q);
            const materias = querySnapshot.docs.map((doc) => ({ label: doc.data().nombre, value: doc.id }));
            setMateriasOptions((prev) => ({ ...prev, [year]: materias }));
        };

        //cargar las materias si se selecciona un año
        if (selectedYear1 !== "default") {
            recuperarMaterias(selectedYear1);
        }
        if (selectedYear2 !== "default") {
            recuperarMaterias(selectedYear2);
        }
        if (selectedYear3 !== "default") {
            recuperarMaterias(selectedYear3);
        }

    }, [selectedYear1, selectedYear2, selectedYear3, props.route.params.idAlumno]);

    const asignarMateria = () => {
        if (numberOfSubjects === "default") {
            alert("Por favor, seleccione la cantidad de materias");
            return;
        }

        let materiasSeleccionadas = [];

        if (selectedYear1 !== "default" && selectedSubject1 !== "default") {
            materiasSeleccionadas.push({ año: selectedYear1, materia: selectedSubject1 });
        }

        if (numberOfSubjects >= "2" && selectedYear2 !== "default" && selectedSubject2 !== "default") {
            materiasSeleccionadas.push({ año: selectedYear2, materia: selectedSubject2 });
        }

        if (numberOfSubjects === "3" && selectedYear3 !== "default" && selectedSubject3 !== "default") {
            materiasSeleccionadas.push({ año: selectedYear3, materia: selectedSubject3 });
        }

        if (materiasSeleccionadas.length !== parseInt(numberOfSubjects)) {
            alert("Por favor, complete todas las selecciones de año y materia");
            return;
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
                <Text style={style.modificarAlumno}>Asignar Materia</Text>

                <Text style={{ fontSize: 15 }}>Cantidad de materias</Text>
                <Picker
                    selectedValue={numberOfSubjects}
                    onValueChange={(itemValue) => {
                        setNumberOfSubjects(itemValue);
                        setSelectedYear("default");
                        setSelectedSubject("default");
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
                            <Picker.Item label="Seleccione el año de la materia" value="default" />
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
                                <Picker.Item label="Seleccione el año de la materia" value="default" />
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
                                <Picker.Item label="Seleccione el año de la materia" value="default" />
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
