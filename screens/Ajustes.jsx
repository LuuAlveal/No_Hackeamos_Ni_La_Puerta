import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Linking   
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaEpet = () => {
  Linking.openURL('https://epet20.edu.ar/');
};
function ComplexForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    consulta: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target; // This line needs modification (explained below)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate sending data (implement logic for your application)
    console.log('Datos del formulario:', formData);
  };

  // No validation logic needed in this example, remove for clarity