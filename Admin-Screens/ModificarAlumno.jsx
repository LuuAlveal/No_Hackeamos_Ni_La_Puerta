import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore } from 'firebase/firestore'; 
import appFirebase from '../firebase';

const BD = getFirestore(appFirebase);

export default function ModificarAlumno(props) {
    const [alumno, setAlumno] = useState({ nombre: '', apellido: '', dni: '' }); 

    const getAlumnoById = async (id) => {
        const alumnoRef = doc(BD, 'alumnos', id);
        const docSnap = await getDoc(alumnoRef);
        if (docSnap.exists()) {
            setAlumno(docSnap.data());
        }else {
            console.log("No se encontró el documento del usuario");
        }
    };

    useEffect(() => {
        if (props.route.params.idAlumno) {
            getAlumnoById(props.route.params.idAlumno);
        }
    }, [props.route.params.idAlumno]);

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
            source={require('../assets/epet20fondo.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.form}>
                <Text style={style.modificarAlumno}>Modificar Alumno</Text>

                <Text style={{ fontSize: 15 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={alumno.nombre}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setAlumno({ ...alumno, nombre: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>Apellido</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={alumno.apellido}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setAlumno({ ...alumno, apellido: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>DNI</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={alumno.dni}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        maxLength={8}
                        onChangeText={(value) => setAlumno({ ...alumno, dni: value })}
                    />
                </View>
                
                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button}>
                        <Text style={style.textButton}>Modificar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
