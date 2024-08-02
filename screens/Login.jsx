import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import appFirebase from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth (appFirebase)

export default function Login (props){

    const [email, setEmail] = useState ()
    const [password, setPassword] = useState ()
    
    const logueo = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
            Alert.alert('Iniciando sesion','Ingresando...')
            props.navigation.navigate('Home')
        } catch (error){
            console.log (error)
            window.alert('Usuario o Contrasenia Incorrecta.')
            Alert.alert('Error','Usuario o Contrasenia Incorrecta.')
        }
    }

    const style = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#304A6E'
        },
        form: {
            margin: 10,
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            width: '90%',
            shadowColor: '#000',
            shadowOffset:{
                width:10,
                height:10,
            },
            shadowOpacity: 0.5,
            shadowRadius:6,
            elevation:5,
        },
        cajaIng:{
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginVertical: 10
        },
        containerButton:{
            alignItems: 'center' 
        },
        button:{
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150
        },
        textButton:{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        },
        logo:{
            width: 200,
            height: 200
        }
    });
    return (
        <View style = {style.container}>

            <View>
                <Image 
                    source={require('../assets/LA-Logo-libri-wiki.png')}
                    style = {style.logo}
                />
                
            </View>
            <View style = {style.form}>
                <View style = {style.cajaIng}>
                    <TextInput
                        placeholder='TuCorreo@gmail.com'
                        style = {{paddingHorizontal:15}}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>

                <View style = {style.cajaIng}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text)=>setPassword(text)}
                        style = {{paddingHorizontal:15}}
                    />
                </View>

                <View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.button}
                        onPress={logueo}
                    >
                        <text style={style.textButton}>
                            Iniciar Sesion
                        </text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
