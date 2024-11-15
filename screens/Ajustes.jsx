import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Linking   
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaEpet = () => {
  Linking.openURL('https://epet20.edu.ar/');
};
function Form() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    consulta: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del formulario:', formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div> 
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="telefono">Telefono:</label>
        <input
          type="telefono"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
       <button type="submit">Enviar</button> (Enviar = Submit)
    </form>
  );
}
export default function Ajustes() {
  const navigation = useNavigation();

  const Ayuda = () => {
    navigation.navigate('Ayuda');
  };

  const Creditos = () => {
    navigation.navigate('Creditos');
  };
