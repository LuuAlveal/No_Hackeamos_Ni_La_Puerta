import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appFirebase from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Swal from 'sweetalert2';
const provider = new GoogleAuthProvider(); //Provedor de google
const auth = getAuth (appFirebase)
const BD = getFirestore(appFirebase)
export default function Login (){
    const navigation = useNavigation();
    //Constante para ver el estado de la contraseña (ver/ocultar)
    const [passwordVisible, setPasswordVisible] = useState(false);
    //loguearse con email y contrasenia
    const [email, setEmail] = useState ()
    const [password, setPassword] = useState ()
    //Funcion para alternar entre ver/ocultar contraseña
    const verPassword = () => {
        setPasswordVisible(!passwordVisible);
    };
    //Login para con email y contraseña
    const logueo = async (e) => {
        e.preventDefault();
        //Inicia sesion con el email y contraseña
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;//recupera las credenciales del usuario
                const docRef = doc(BD, 'alumnos', user.uid);//busca el docuemnto del usuario por su uid
                const docSnap = await getDoc(docRef);//recupera el docuemnto
                if (docSnap.exists()) { //se corrobora si el documento existe
                    const userData = docSnap.data();//se obtiene los datos del usuario
                    const rol = userData.rol;//se obtiene el rol del usuario
                    const estado = userData.estado;
                    //dependiendo del rol es a donde va a ser rediccionado el usuario
                    if (rol === '1') {
                        navigation.navigate('Admin');
                    } else if ((rol === '2')&& (estado === 'ACTIVO')) {
                        navigation.navigate('Home')
                    }
                    else{
                        Swal.fire({
                            title: 'El usuario esta inactivo',
                            icon: 'error',
                            backdrop: false, 
                            allowOutsideClick: false 
                        })
                    }
                } else {
                    console.log("No se encontró el documento del usuario");
                }
            })
            .catch((error) => {
                //En caso de haber algun error
                console.log(error)
                Swal.fire({
                    title: 'Email o contraseña incorrecto',
                    icon: 'error',
                    backdrop: false, 
                    allowOutsideClick: false 
                })
            })
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
          navigation.navigate('Home')
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
    //Constante para navegar hacia el register
    const Registrarse = () => {
        navigation.navigate('Register');
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
            boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.5)', 
            elevation: 5
        },
        cajaIng:{
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginVertical: 10
        },
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginVertical: 10,
            flexDirection:'row',
            alignItems: 'center',
            paddingHorizontal: 15
        },        
        cajaIngCorreo:{
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
                <View style = {style.cajaIngCorreo}>
                    <TextInput 
                        pattern="[A-Za-z]{20}"
                        placeholder='TuCorreo@example.com'
                        style = {{paddingHorizontal:15, outline:0}}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
                <Text style = {{ fontSize: 15}}>Password</Text>
                <View style = {style.cajaIng}>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={!passwordVisible} //Dependiendo del estado se va a ver/ocultar la contraseña
                            onChangeText={(text) => setPassword(text)} 
                            style={{ outline: 0,flex:1 }}
                        />
                    {/*boton para ver el icono del ojo*/}
                        <TouchableOpacity onPress={verPassword}>
                            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} />
                        </TouchableOpacity>
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
