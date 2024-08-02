import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home (){
    const style = StyleSheet.create({
        
    })
    return (
        <View style = {sty}>
                <View style = {style.containerButton}>
                <TouchableOpacity 
                    style = {style.button}
                    onPress={logueo}
                >
                    <text style={style.textButton}>
                        Anotarse a Materias previas
                    </text>
                    </TouchableOpacity>
                </View> 
        </View>
    );
}