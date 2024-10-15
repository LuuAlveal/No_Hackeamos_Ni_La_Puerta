import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebase';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const BD = getFirestore(appFirebase);

export default function ListaMaterias() {
    const [materias, setMaterias] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const materiasCollection = collection(BD, 'materias');
        const Materias = onSnapshot(materiasCollection, (querySnapshot) => {
            const materias = [];
            querySnapshot.forEach((doc) => {
                const { nombre, año } = doc.data();
                    materias.push({
                        id: doc.id,
                        nombre,
                        año
                    });
            });
            setMaterias(materias);
        });

        return () => Materias();
    }, []);
    const AgregarMaterias = () => {
        navigation.navigate('AgregarMaterias')
    };
    const eliminarMaterias = async (id) => {
        const materiasRef = doc(BD, 'materias', id);
        await deleteDoc(materiasRef);
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
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
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
        modificarMaterias: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom: 5
        },
        scrollView: {
            height: 300,
            overflowY: 'auto'
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        materiasContainer: {
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
                    <Text style={style.modificarMaterias}>LISTA DE MATERIAS</Text>
                    <View style={style.scrollView}>
                        {materias.map((materias) => (
                            <View style={style.materiasContainer} key={materias.id}>
                                <ListItem bottomDivider 
                                    onPress={() =>
                                        navigation.navigate('ModificarMaterias', {
                                            idMaterias: materias.id
                                        })
                                    }
                                >
                                    <ListItem.Chevron />
                                    <ListItem.Content>
                                        <ListItem.Title>{materias.nombre}</ListItem.Title>
                                        <ListItem.Subtitle>{materias.año}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <TouchableOpacity
                                        onPress={() => eliminarMaterias(materias.id)}
                                    >
                                        <Icon name="trash" size={24} color="#FF0000" style={style.basura} />
                                    </TouchableOpacity>
                                </ListItem>
                            </View>
                        ))}
                    </View>
                    <View style={style.containerButton}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={"/"}>
                            <Text style={style.textButton}>
                                Agregar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}