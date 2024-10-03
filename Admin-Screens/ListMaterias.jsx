import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import appFirebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
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
                    <ScrollView style={style.scrollView}>
                        {materias.map((materia) => (
                            <ListItem key={materia.id} bottomDivider onPress={() =>
                                navigation.navigate('ModificarMaterias', {
                                    idmaterias: materia.id
                                })
                            } >
                                <ListItem.Chevron />
                                <ListItem.Content>
                                    <ListItem.Title>{materia.nombre} {materia.fecha} - Año {materia.year}</ListItem.Title>
                                    <ListItem.Subtitle>{materia.profesor}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>
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