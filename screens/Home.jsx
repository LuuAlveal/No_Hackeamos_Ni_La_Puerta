import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function Home(props) {
    const Opciones = () => {
        props.navigation.navigate('Opciones')
    }
    const Ayuda = () => {
        props.navigation.navigate('Ayuda')
    }
    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerButton: {
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 250
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        },
        logo: {
            width: 200,
            height: 200,
            borderRadius: 50
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
                        onPress={Opciones}
                    >
                        <Text style={style.textButton}>
                            Anotarse a Materias previas
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.containerButton}>
                    <TouchableOpacity>
                        <Text style={style.textButton}>
                            Historial
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.button}
                        onPress={Ayuda}
                    >
                    <Text style={style.textButton}>
                        Ayuda
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.containarButton}>
                    <TouchableOpacity style={style.button} >
                        <Text style={style.textButton}>
                            Ajustes
                        </Text>
                    </TouchableOpacity>
                </View >

            </View>
        </ImageBackground>
    );
}