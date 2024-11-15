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
    //Estado para el picker de seleccionar año
    const [selectedYear, setSelectedYear] = useState("default");
    //Constante para usar navigate 
    const navigation = useNavigation();
    //Constante para el estado de la contraseña (ver/ocultar)
    const [passwordVisible, setPasswordVisible] = useState(false);
    //Almacena los valores ingresados
    const [state, setState] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        password: "",
        rol: "2",
        estado: "ACTIVO"

    })
    //Funcion para alternar entre ver/ocultar contraseña
    const verPassword = () => {
        setPasswordVisible(!passwordVisible);
    };
    //Captura el texto ingresado y actualiza a el estado de la constante donde se almacenan los valores
    const handleChangeText = (name, value) => {
        // Si el campo es 'dni', solo permite números
        if (name === 'dni') {
            const numericValue = value.replace(/[^0-9]/g, ''); // Reemplaza cualquier carácter que no sea un número
            setState({ ...state, [name]: numericValue });
        } else {
            setState({ ...state, [name]: value });
        }
    };
    // Función para validar caracteres
    const validateInput = (value) => {
        const regex = /^[A-Za-z\s]*$/; // Permitir solo letras y espacios
        return regex.test(value);
    };
    //Funcion para crear cuenta
    const handleCreateAccount = async () => {
        //Alertas dependiendo del estado de los campos (Si es que estan vacios o por defecto.)
        if (state.nombre === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su nombre',
                icon: 'warning',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.apellido === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su apellido',
                icon: 'warning',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.dni === '' || isNaN(state.dni)) {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese un DNI válido (solo números)',
                icon: 'error',
                backdrop: false,
                allowOutsideClick: false
            });
        } else if (state.email === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su email',
                icon: 'error',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.password === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese una contraseña',
                icon: 'error',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (selectedYear === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Seleccione un año',
                icon: 'warning',
                backdrop: false, 
                allowOutsideClick: false 
            });
        }
        //Si los campos estan bien pasa esto
        else {
            try {
                //Crea el usuario con la contraseña en firebase
                const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
                const user = userCredential.user;
                //Guadra los datos del usuario en un documento de la coleccion de alumnos
                await setDoc(doc(BD, 'alumnos', user.uid), {
                    nombre: state.nombre,
                    apellido: state.apellido,
                    dni: state.dni,
                    email: state.email,
                    rol: state.rol,
                    year: selectedYear,
                    estado: state.estado
                });
                Swal.fire({
                    title: 'Cuenta Creada Exitosamente',
                    icon: 'success',
                    timer: '2000',
                    backdrop: false, 
                    allowOutsideClick: false 
                })
                navigation.navigate('Login')
            }
            catch (error) {
                //Por si hay algun error con la auth de firebase, muestra el error al usuario.
                const CodigoError = error.code;
                if (CodigoError == 'auth/email-already-in-use')
                    Swal.fire({
                        title: 'Error',
                        text: 'El Email ya esta en uso',
                        icon: 'error',
                        backdrop: false, 
                        allowOutsideClick: false 
                    })
                else if (CodigoError == 'auth/invalid-email')
                    Swal.fire({
                        title: 'Error',
                        text: 'Email Invalido. Ejemplo de email requerido: TuCorreo@example.com',
                        icon: 'error',
                        backdrop: false, 
                        allowOutsideClick: false 
                    })
                else if (CodigoError == 'auth/weak-password')
                    Swal.fire({
                        title: 'Error ',
                        text: 'La contraseña debe tener minimo 6 digitos',
                        icon: 'warning',
                        backdrop: false, 
                        allowOutsideClick: false 
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
            marginBottom: 10,
            marginTop: 2
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
            fontSize: '1em',
            paddingBottom: 10
        },
        cajaIngPass: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginTop: 2,
            marginBottom: 10,
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

                <Text style={{ fontSize: 12 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='Nombre'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => {
                        const upperCaseValue = value.toUpperCase(); // Convertir a mayúsculas
                        if (validateInput(upperCaseValue)) {
                            setAlumno({ ...alumno, nombre: upperCaseValue });
                            }
                        }}
                    />
                </View>

                <Text style={{ fontSize: 12 }}>Apellido</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='Apellido'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => {
                            const upperCaseValue = value.toUpperCase(); // Convertir a mayúsculas
                            if (validateInput(upperCaseValue)) {
                                setAlumno({ ...alumno, apellido: upperCaseValue });
                            }
                        }}
                    />
                </View>

                <Text style={{ fontSize: 12 }}>DNI</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='DNI'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        maxLength={8}
                        onChangeText={(value) => handleChangeText('dni', value)}
                    />
                </View>

                <Text style={{ fontSize: 12 }}>Año</Text>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedYear(itemValue)
                    }
                    style={style.cajaIng}
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

                <Text style={{ fontSize: 12 }}>E-Mail</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='TuCorreo@example.com'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('email', value)}
                    />
                </View>


                <Text style={{ fontSize: 12 }}>Contraseña</Text>
                <View style={style.cajaIngPass}>
                    <TextInput
                        placeholder='Contraseña'
                        secureTextEntry={!passwordVisible} //Dependiendo del estado se va a ver/ocultar la contraseña
                        onChangeText={(value) => handleChangeText('password', value)}
                        style={{ flex:1, outline: 0 }}
                    />
                    {/boton para ver el icono del ojo/}
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