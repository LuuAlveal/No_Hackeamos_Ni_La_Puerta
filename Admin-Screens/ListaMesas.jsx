import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const BD = getFirestore(appFirebase);

export default function ListaMesas() {
    const [mesas, setMesas] = useState([]);
    const navigation = useNavigation();
    const AgregarMesas = () => {
        navigation.navigate('AgregarMesas')
    };
    useEffect(() => {
        const mesasCollection = collection(BD, 'mesas');
        const Mesas = onSnapshot(mesasCollection, (querySnapshot) => {
            const mesas = [];
            querySnapshot.forEach((doc) => {
                const { nombre, profesor, fecha, year } = doc.data();
                mesas.push({
                    id: doc.id,
                    nombre,
                    profesor,
                    fecha,
                    year
                });
            });
            setMesas(mesas);
        });

        return () => Mesas();
    }, []);

    const eliminarMesa = async (id) => {
        const mesaRef = doc(BD, 'mesas', id);
        await deleteDoc(mesaRef);
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
        modificarMesas: {
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
                    <Text style={style.modificarMesas}>LISTA DE MESAS</Text>
                    <View style={style.scrollView}>
                        {mesas.map((mesa) => (
                            <View style={style.alumnoContainer} key={mesa.id}>
                                <ListItem bottomDivider
                                    onPress={() =>
                                        navigation.navigate('ModificarMesas', {
                                            idMesas: mesa.id
                                        })
                                    }
                                >
                                    <ListItem.Chevron />
                                    <ListItem.Content>
                                        <ListItem.Title>{mesa.nombre} {mesa.fecha} - Año {mesa.year}</ListItem.Title>
                                        <ListItem.Subtitle>{mesa.profesor}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <TouchableOpacity
                                        onPress={() => eliminarMesa(mesa.id)}
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
                        onPress={AgregarMesas}
                    >
                        <Text style={style.textButton}>
                            Agregar mesa
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
