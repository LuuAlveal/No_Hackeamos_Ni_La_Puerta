import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import appFirebase from '../firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
const auth = getAuth (appFirebase)

export default function Register (props){

    const [email, setEmail] = useState ()
    const [password, setPassword] = useState ()

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then ((userCredential) =>{
            console.log('Cuenta creada')
            alert('Cuenta creada Exitosamente ...')
            const user = userCredential.user;
            console.log(user)
            Alert.alert('Cuenta creada','Exitosamente')
            props.navigation.navigate('Login')
        })
        .catch(error => {
            console.log(error)
            window.alert(error.message)
            Alert.alert(error.message)
        })
    }
    const style = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {
            margin: 20,
            padding: '4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            width: 'auto',
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
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tituloRegistrarse:{
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: '2em',
            paddingBottom: 25
        }
    });
    return (
        <ImageBackground 
            source={require ('../assets/epet20fondo.png')}
            resizeMode= {'cover'}
            style = {style.backgroundImage}
        >
            <View style = {style.form}>
                <Text style = {style.tituloRegistrarse}>REGISTRARSE</Text>
                <Text style = {{ fontSize: 15}}>E-Mail</Text>
                <View style = {style.cajaIng}>
                    <TextInput
                        placeholder='TuCorreo@example.com'
                        style = {{paddingHorizontal:15, outline:0}}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
                <Text style = {{ fontSize: 15}}>Password</Text>
                <View style = {style.cajaIng}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text)=>setPassword(text)}
                        style = {{paddingHorizontal:15, outline:0}}
                    />
                </View>

                <View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.button}
                        onPress={ handleCreateAccount }
                    >
                        <Text style={style.textButton}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
    
}
