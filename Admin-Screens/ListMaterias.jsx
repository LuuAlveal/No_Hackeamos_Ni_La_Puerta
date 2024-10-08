import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const BD = getFirestore(appFirebase);

export default function ListMaterias() {
    const [materias, setmaterias] = useState([]);
    const navigation = useNavigation();
    const AgregarMaterias = () => {
        navigation.navigate('AgregarMaterias')
    };
    useEffect(() => {
        const materiasCollection = collection(BD, 'materias');
        const materias = onSnapshot(materiasCollection, (querySnapshot) => {
            const materias = [];
            querySnapshot.forEach((doc) => {
                const { nombre, profesor, fecha, year } = doc.data();
                materias.push({
                    id: doc.id,
                    nombre,
                    profesor,
                    fecha,
                    year
                });
            });
            setmaterias(materias);
        });

        return () => materias();
    }, []);

    const eliminarMateria = async (id) => {
        const materiaRef = doc(BD, 'materias', id);
        await deleteDoc(materiaRef);
        setmaterias(materias.filter((materia) => materia.id !== id));
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
        modificarmateria: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom: 5
        },
        containerButton: {
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 13,
            marginTop: 20,
            width: 250
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        },
        scrollView: {
            height: 300,
            overflowY: 'auto'
        },
        alumnoContainer: {
            width: '100%',
            position: 'relative'
        },
        basura: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -12 }, { translateY: -12 }],
            width: 24,
            height: 24
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
            <Text style={style.modificarmateria}>LISTA DE MATERIAS</Text>
            <View style={style.scrollView}>
                {materias.map((materia) => (
                    <View style={style.alumnoContainer} key={materia.id}>
                        <ListItem bottomDivider 
                            onPress={() =>
                                navigation.navigate('ModificarMaterias', {
                                    idmaterias: materia.id
                                })
                            }
                        >
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title>{materia.nombre} {materia.fecha} - Año {materia.year}</ListItem.Title>
                                <ListItem.Subtitle>{materia.profesor}</ListItem.Subtitle>
                            </ListItem.Content>
                            <TouchableOpacity
                                onPress={() => eliminarMateria(materia.id)}
                            >
                                <Icon name="trash" size={24} color="#FF0000" style={style.basura} />
                            </TouchableOpacity>
                        </ListItem>
                    </View>
                ))}
            </View>
        </View>
        <View style={style.containerButton}>
            <TouchableOpacity
                style={style.button}
                onPress={AgregarMaterias}
                >
                    <Text style={style.textButton}>
                        Agregar Materia
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
}