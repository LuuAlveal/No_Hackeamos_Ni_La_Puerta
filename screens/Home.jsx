import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Linking } from 'react-native';

export default function Home (props){
    const Opciones = ()=>{
        props.navigation.navigate('Opciones')
    }
    const Ayuda = ()=>{
        props.navigation.navigate('Ayuda')
    }
    const handlePress = () => {
        Linking.openURL('https://drive.google.com/file/d/1mGvps6PheUVDiOZqAsK6akfrO_bBrEqZ/view?usp=drive_link');
      };
    const style = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#304A6E'
        },
        containerButton:{
            alignItems: 'center' 
        },
        button:{
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 250
        },
        textButton:{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        },
        logo:{
            width: 200,
            height: 200,
            borderRadius: 50
        },
        
    })
    return (
        <View style = {style.container}>
                    <Text
                        style={{
                            fontFamily: 'sans-serif,roboto',
                            fontSize: 50
                        }}
                    >
                        APLICACION DIVERTIDA :D

                    </Text>
                <View>
                    <Image 
                        source={require('../assets/cdf6ce500bef3968c210ca45a588e4c4.jpg')}
                        style = {style.logo}
                    />
                </View>
                <View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.button}
                        onPress={Opciones}
                    >
                    <Text style={style.textButton}>
                        Anotarse a Materias previas
                    </Text>
                    </TouchableOpacity>
                </View> 
                <View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.button}
                        onPress={handlePress}
                    >
                    <Text style={style.textButton}>
                        Historial
                    </Text>
                    </TouchableOpacity>
                </View>
                {/*<View style = {style.containerButton}>
                    <TouchableOpacity 
                        style = {style.button}
                        onPress={Ayuda}
                    >
                    <Text style={style.textButton}>
                        Ayuda
                    </Text>
                    </TouchableOpacity>
                </View>*/}
                <View style = {style.containarButton}>   
                <TouchableOpacity style = {style.button} >
                    <Text style={style.textButton}> 
                    Ajustes 
                    </Text>    
                    </TouchableOpacity> 
                </View >
                <Image                      
                    source={require('../assets/3b4c0036b590cc1977d03230bb7d34f0.jpg')}
                    style = {{
                        width:200,
                        height:200,
                        borderRadius:90
                    }}
                />
        </View>
    );
}