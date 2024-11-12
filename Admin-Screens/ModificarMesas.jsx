import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Swal from 'sweetalert2';
const BD = getFirestore(appFirebase);
export default function ModificarMesas(props) {
    const [mesas, setmesas] = useState({ nombre: '', profesor: '', year: '' });
    const [selectedYear, setSelectedYear] = useState("default");
    //Leer el document de la Mesa
    const getmesasById = async (id) => {
        const mesasRef = doc(BD, 'mesas', id);
        const docSnap = await getDoc(mesasRef);
        if (docSnap.exists()) {
            setmesas(docSnap.data());
            setSelectedYear(docSnap.data().year);
        } else {
            console.log("No se encontro el documento de la mesa");
        }
    };
    //Recuperar el Id de la Mesa
    useEffect(() => {
        if (props.route.params.idMesas) {
            getmesasById(props.route.params.idMesas);
        }
    }, [props.route.params.idMesas]);
    //Act. Mesa funcion
    const ActMesa = async () => {
        const mesasRef = doc(BD, 'mesas', props.route.params.idMesas);
        try {
            await updateDoc(mesasRef, {
                nombre: mesas.nombre,
                profesor: mesas.profesor,
                year: selectedYear
            });
            Swal.fire({
                title: 'Mesa actualizado exitosamente',
                icon: 'success',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } catch (error) {
            Swal.fire({
                error: 'Error',
                title: 'No se pudo modificar la Mesa',
                icon: 'error',
                backdrop: false, 
                allowOutsideClick: false 
            })
            console.log(error)
        }
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
            justifyContent: 'center',
            alignItems: 'center'
        },
        modificarmesas: {
            fontSize: 18,
            fontFamily: 'sans-serif',
            textAlign: 'center'
        },
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 10,
            marginTop: 2,
            borderColor: 'white',
        },
        containerButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150,
            marginHorizontal: 10
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        }
    });
    return (
        <ImageBackground
            source={require('../assets/epet20fondo.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.form}>
                <Text style={style.modificarmesas}>Modificar mesas</Text>
                <Text style={{ fontSize: 15 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={mesas.nombre}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setmesas({ ...mesas, nombre: value })}
                    />
                </View>
                <Text style={{ fontSize: 15 }}>Profesor</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={mesas.profesor}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setmesas({ ...mesas, apellido: value })}
                    />
                </View>
                <Text style={{ fontSize: 15 }}>Año</Text>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedYear(itemValue)
                    }
                    style={style.cajaIng}
                >
                    <Picker.Item label="Seleccione su año" value="default" />
                    <Picker.Item label="1° año" value="1" />
                    <Picker.Item label="2° año" value="2" />
                    <Picker.Item label="3° año" value="3" />
                    <Picker.Item label="4° año" value="4" />
                    <Picker.Item label="5° año" value="5" />
                    <Picker.Item label="6° año" value="6" />
                </Picker>
                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button} onPress={ActMesa}>
                        <Text style={style.textButton}>Modificar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}