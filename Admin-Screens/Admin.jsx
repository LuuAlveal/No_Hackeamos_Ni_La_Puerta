import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Admin() {
    const navigation = useNavigation();
    const ListAlum = () => {
        navigation.navigate('ListAlum')
    }
    const ListMaterias = ()=>{
        navigation.navigate('ListMaterias')
    }
    const style = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius:10,         
            margin: '1rem',
            padding: '2rem',
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
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
    return (
        <ImageBackground
            source={require('../assets/FondoEpetHome.jpeg')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.container}>
                <View style={style.containerButton}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={ListAlum}
                    >
                        <Text style={style.textButton}>
                            LISTA DE ALUMNOS
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.containerButton}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={ListMaterias}
                    >
                        <Text style={style.textButton}>
                            LISTA DE MATERIAS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}