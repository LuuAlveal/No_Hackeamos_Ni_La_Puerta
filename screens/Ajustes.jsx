import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground,} from 'react-native';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const PaginaEpet = () => {
  Linking.openURL('https://epet20.edu.ar/');
};

export default function Ajustes () {
  const navigation = useNavigation();
  const Ayuda = ()=> {
    navigation.navigate('Ayuda')
  }
  const Creditos = ()=> {
    navigation.navigate('Creditos')
  }
  function ComplexForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      birthday: '',
    })
  }
  return (
    <ImageBackground
      source={require ('../assets/epet20fondo.png')}
      resizeMode= {'cover'}
      style = {styles.backgroundImage}
    > 
    <View style={styles.container}>
        <TouchableOpacity style={styles.Button} onPress={Ayuda}>
          <Text>Preguntas Frecuentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={Creditos}>
          <Text>Creditos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={PaginaEpet}>
          <Text>Pagina Oficial</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '160%',
    backgroundColor: '#FFFAFA'
  }
});