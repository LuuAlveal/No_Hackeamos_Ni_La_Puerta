import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import appFirebase from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import Swal from 'sweetalert2';
const provider = new GoogleAuthProvider();
const auth = getAuth (appFirebase)
export default function Login (props){


    //loguearse con email y contrasenia
    const [email, setEmail] = useState ()
    const [password, setPassword] = useState ()
    
    const logueo = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            props.navigation.navigate('Home')
        } catch (error){
            console.log (error)
            Swal.fire({
                title:'Email o contraseña incorrecto',
                icon: 'error'
            })
        }
    }
    //Loguearse con google
    const LogueoGoogle =  async (e) =>{
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          props.navigation.navigate('Home')
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
    const Registrarse = () => {
        props.navigation.navigate('Register');
    }
    const style = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        form: {
            margin: '1rem',
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
            width: 150,
            padding:20,
            border: 'none',
            color: 'white'
        },
        buttonGoogle:{
            marginTop:10,
            fontSize: 15
        },
        textButton:{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        },        
        textButtonGoogle:{
            textAlign: 'center',
            color: '#0a0a0',
            fontFamily: 'sans-serif'
        },
        logo:{
            width: 200,
            height: 200
        },
        registerButton:{
            color: 'white',
            fontSize: 20
        },
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
    return (
     <ImageBackground
        source={require ('../assets/epet20fondo.png')}
        resizeMode= {'cover'}
        style = {style.backgroundImage}
     >
        <View style = {style.container}>

            <View>
                <Image 
                    source={require('../assets/LA-Logo-libri-wiki.png')}
                    style = {style.logo}
                />
            </View>

            <View style = {style.form}>
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
                        onPress={logueo}
                    >
                        <Text style={style.textButton}>
                            Iniciar Sesion
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.buttonGoogle}
                        onPress={ LogueoGoogle }
                    >
                        <Text style={style.textButtonGoogle}>
                            Iniciar con Google 
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <TouchableOpacity 
                    style = {style.registerButton}
                    onPress={ Registrarse }
                >
                    <Text 
                        style = {{color:"white", fontSize:"1.2rem"}}
                    >
                        Crear  Cuenta
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
        </ImageBackground>
    );
}
