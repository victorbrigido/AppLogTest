import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon3 from 'react-native-vector-icons/AntDesign';


export default function Addbutton({navigation}) {
    
  return (
    <View style={styles.buttonContainer5}>
      <TouchableOpacity style={styles.button5} onPress={() => navigation.navigate('Insert')}>
        <Icon3 name="addfile" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer5: {
    position: 'absolute',
    bottom: '10%',
    right: '12%',
    borderRadius: 50,
    backgroundColor: '#00BFFF',
    elevation:8,
    shadowColor: '#000', // Cor da sombra
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 4.84, // "Espessura" da sombra
    zIndex: 1,
  },
  button5: {
    padding: 20,
  },
});
