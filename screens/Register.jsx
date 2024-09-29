import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import appFirebase from '../firebase';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const auth = getAuth(appFirebase)
const BD = getFirestore(appFirebase)

export default function Register() {
    const [selectedYear, setSelectedYear] = useState("default");
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [state, setState] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        password: "",
        rol: "2"
    })
    const verPassword = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const handleCreateAccount = async () => {
        if (state.nombre === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su nombre',
                icon: 'warning'
            })
        } else if (state.apellido === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su apellido',
                icon: 'warning'
            })
        } else if (state.dni === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su dni',
                icon: 'error'
            })
        } else if (state.email === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su email',
                icon: 'error'
            })
        } else if (state.password === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese una contraseña',
                icon: 'error'
            })
        } else if (selectedYear === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Seleccione un año',
                icon: 'warning'
            });
        }
        else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
                const user = userCredential.user;

                await setDoc(doc(BD, 'alumnos', user.uid), {
                    nombre: state.nombre,
                    apellido: state.apellido,
                    dni: state.dni,
                    email: state.email,
                    materiasPrevias: [],
                    rol: state.rol,
                    year: selectedYear
                });
                Swal.fire({
                    title: 'Cuenta Creada Exitosamente',
                    icon: 'success',
                    timer: '2000'
                })
                navigation.navigate('Login')
            }
            catch (error) {
                const CodigoError = error.code;
                if (CodigoError == 'auth/email-already-in-use')
                    Swal.fire({
                        title: 'Error',
                        text: 'El Email ya esta en uso',
                        icon: 'error'
                    })
                else if (CodigoError == 'auth/invalid-email')
                    Swal.fire({
                        title: 'Error',
                        text: 'Email Invalido. Ejemplo de email requerido: TuCorreo@example.com',
                        icon: 'error'
                    })
                else if (CodigoError == 'auth/weak-password')
                    Swal.fire({
                        title: 'Error ',
                        text: 'La contraseña debe tener minimo 6 digitos',
                        icon: 'warning'
                    })
            };
        }

    }
    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {

            padding: 15,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            width: 'auto',
            boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.5)',
        },
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginVertical: 10
        },
        containerButton: {
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150
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
        },
        tituloRegistrarse: {
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: '2em',
            paddingBottom: 25
        },
        cajaIngPass: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginVertical: 10,
            flexDirection:'row',
            alignItems: 'center',
            paddingHorizontal: 15
        },
        picker:{
            height: 45,
            marginBottom: 5,
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 10
        }
    });
    return (
        <ImageBackground
            source={require('../assets/epet20fondo.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.form}>
                <Text style={style.tituloRegistrarse}>REGISTRARSE</Text>

                <Text style={{ fontSize: 15 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='Nombre'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('nombre', value)}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>Apellido</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='Apellido'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('apellido', value)}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>DNI</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='DNI'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        maxLength={8}
                        onChangeText={(value) => handleChangeText('dni', value)}
                    />
                </View>

                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedYear(itemValue)
                    }
                    style={style.picker}
                >
                    <Picker.Item label="Seleccione su año" value="default" />
                    <Picker.Item label="1° año" value="1°" />
                    <Picker.Item label="2° año" value="2°" />
                    <Picker.Item label="3° año" value="3°" />
                    <Picker.Item label="4° año" value="4°" />
                    <Picker.Item label="5° año" value="5°" />
                    <Picker.Item label="6° año" value="6°" />
                    <Picker.Item label="Egresado" value="Egresado" />
                </Picker>

                <Text style={{ fontSize: 15 }}>E-Mail</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='TuCorreo@example.com'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('email', value)}
                    />
                </View>


                <Text style={{ fontSize: 15 }}>Password</Text>
                <View style={style.cajaIngPass}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={!passwordVisible}
                        onChangeText={(value) => handleChangeText('password', value)}
                        style={{ flex:1, outline: 0 }}
                    />
                    <TouchableOpacity onPress={verPassword}>
                        <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={style.containerButton}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={handleCreateAccount}
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
