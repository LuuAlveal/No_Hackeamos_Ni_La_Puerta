import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
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
    const [cantidadMaterias, setcantidadMaterias] = useState("default"); //cantidad de materias que el alumno tiene
    const [materiasOpciones, setmateriasOpciones] = useState({}); //opciones de materias disponibles org por año

    //cargar las materias dependiendo del año seleccionado
    useEffect(() => {
        //obtener materias según el año
        const recuperarMaterias = async (year) => {
            //consulta para obtener la materia segun el año
            const consulta = query(collection(BD, "mesas"), where("year", "==", year.toString())); //convertir el año para leerlo
            const querySnapshot = await getDocs(consulta);
            //mapeo de materias para que solo salga el nombre en el dropdown, y mandamos su id como value
            const materias = querySnapshot.docs.map((doc) => ({ label: doc.data().nombre, value: doc.id }));
            //dependiendo el año se setea las materias que correspondan
            setmateriasOpciones((prev) => ({ ...prev, [year]: materias }));
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

    //asignar materias al alumno
    const asignarMateria = async () => {
        //almacenar las materias seleccionadas en un array
        let materiasSeleccionadas = [];

        //verifica y agrega las materias seleccionadas
        if (selectedYear1 !== "default" && selectedSubject1 !== "default") {
            materiasSeleccionadas.push(selectedSubject1);
        }
        if (cantidadMaterias >= "2" && selectedYear2 !== "default" && selectedSubject2 !== "default") {
            materiasSeleccionadas.push(selectedSubject2);
        }
        if (cantidadMaterias === "3" && selectedYear3 !== "default" && selectedSubject3 !== "default") {
            materiasSeleccionadas.push(selectedSubject3);
        }
        //si la cantidad de materias seleccionadas no coincide con la cantidad de materias a asignar, muestra lo siguiente
        if (materiasSeleccionadas.length !== parseInt(cantidadMaterias)) {
            Swal.fire({
                title: 'Error',
                text: "Complete todas las selecciones de año y materia",
                icon: 'error',
                backdrop: false,
                allowOutsideClick: false
            });
            return;
        }
        try {
            //obtenemos el documento del alumno por el id pasado por parametro
            const alumnoRef = doc(BD, "alumnos", props.route.params.idAlumno);
            //snapshot del documento del alumno para acceder a sus datos actuales
            const alumnoSnapshot = await getDoc(alumnoRef);
            //obtenemos las materias ya existentes del alumno o si no tiene hacemos un array vacio
            let materiasExistentes = alumnoSnapshot.data().materias || [];
            //agregamos las materias seleccionadas con las materias ya existentes, si hay duplicadas se eliminan
            materiasExistentes = [...new Set([...materiasExistentes, ...materiasSeleccionadas])];

            //si el alumno tiene mas de 3 materias en total, muestra una alerta y limita la lista a 3
            if (materiasExistentes.length > 3) {
                materiasExistentes = materiasExistentes.slice(0, 3);
                return Swal.fire({
                    title: 'Cantidad máxima de previas',
                    text: "El alumno tiene la cantidad máxima de materias previas",
                    icon: 'error',
                    backdrop: false,
                    allowOutsideClick: false
                });
            }

            //act. el documento del alumno con la lista de materias actualizada
            await updateDoc(alumnoRef, {
                materias: materiasExistentes
            });

            Swal.fire({
                title: 'Materia/s asignada/s con exito',
                icon: 'success',
                backdrop: false,
                allowOutsideClick: false
            });

        } catch (error) {
            //en caso si hay algun error muestra esta alerta
            console.error(error);
            Swal.fire({
                title: 'Error al asignar materias',
                icon: 'error',
                backdrop: false,
                allowOutsideClick: false
            });
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
            style={style.backgroundImage}>
            <View style={style.form}>
                <Text style={style.modificarAlumno}>Asignar Materia</Text>
                <Text style={{ fontSize: 15 }}>Cantidad de materias</Text>
                <Picker
                    selectedValue={cantidadMaterias}
                    onValueChange={(itemValue) => {
                        setcantidadMaterias(itemValue);
                        setSelectedYear1("default");
                        setSelectedYear2("default");
                        setSelectedYear3("default");
                        setSelectedSubject1("default");
                        setSelectedSubject2("default");
                        setSelectedSubject3("default");
                    }}
                    style={style.cajaIng}>
                    <Picker.Item label="Seleccione las materias" value="default" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>
                {/*dependiendo de la cantidad de materias a rendir muestra la cantidad de dropsdowns*/}
                {["1", "2", "3"].slice(0, cantidadMaterias).map((index) => (
                    <View key={index}>
                        <Text style={{ fontSize: 15 }}>Año</Text>
                        <Picker
                            selectedValue={eval(`selectedYear${index}`)}
                            onValueChange={(itemValue) => {
                                eval(`setSelectedYear${index}(itemValue)`);
                                eval(`setSelectedSubject${index}("default")`);
                            }}
                            style={style.cajaIng}>
                            <Picker.Item label="Seleccione el año de la materia" value="default" />
                            {[1, 2, 3, 4, 5, 6].map((year) => (
                                <Picker.Item key={year} label={`${year}°`} value={`${year}`} />
                            ))}
                        </Picker>
                        <Text style={{ fontSize: 15 }}>Materia</Text>
                        <Picker
                            selectedValue={eval(`selectedSubject${index}`)}
                            onValueChange={(itemValue) => eval(`setSelectedSubject${index}(itemValue)`)}
                            style={style.cajaIng}>
                            <Picker.Item label="Seleccione la materia" value="default" />
                            {materiasOpciones[eval(`selectedYear${index}`)]?.map((materia) => (
                                <Picker.Item key={materia.value} label={materia.label} value={materia.value} />
                            ))}
                        </Picker>
                    </View>
                ))}

                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button} onPress={asignarMateria}>
                        <Text style={style.textButton}>Asignar Materia</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
