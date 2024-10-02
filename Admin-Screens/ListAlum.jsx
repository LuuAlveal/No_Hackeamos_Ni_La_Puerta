import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import appFirebase from '../firebase';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModificarAlumno from './ModificarAlumno';
const BD = getFirestore(appFirebase);

export default function ListAlum() {
    const [alumnos, setAlumnos] = useState([]);
    const navigation = useNavigation();
    const ModificarAlumno = ()=>{
        navigation.navigate('ModificarAlumno')
    };

    useEffect(() => {
        const alumnosCollection = collection(BD, 'alumnos');
        const Alumnos = onSnapshot(alumnosCollection, (querySnapshot) => {
            const alumnos = [];
            querySnapshot.forEach((doc) => {
                const { nombre, apellido, dni,year } = doc.data();
                alumnos.push({
                    id: doc.id,
                    nombre,
                    apellido,
                    dni,
                    year
                });
            });
            setAlumnos(alumnos);
        });

        return () => Alumnos();
    }, []);

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
        modificarAlumno: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom:5
        },
        scrollView: {
            height: 300,
            overflowY: 'auto'
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
                    <Text style={style.modificarAlumno}>LISTA DE ALUMNOS</Text>
                    <View style={style.scrollView}>
                        <TouchableOpacity
                            onPress={ModificarAlumno}
                        >
                        {alumnos.map((alumno) => (
                            <ListItem key={alumno.id} bottomDivider>
                                <ListItem.Chevron />
                                <ListItem.Content>
                                    <ListItem.Title>{alumno.nombre} {alumno.apellido} - Año {alumno.year}</ListItem.Title>
                                    <ListItem.Subtitle>{alumno.dni}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
