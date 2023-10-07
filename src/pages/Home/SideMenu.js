import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native'




export default function SideMenu ({ isOpen, onClose, onHomePress, onSettingsPress, onLogoffPress, userId , userEmail }) {
    const navigation1 = useNavigation();
    
  
    if (!isOpen) {
    return null; // Retorna nulo se o menu não estiver aberto
  }

  return (
    <Animatable.View 
  animation={isOpen ? 'slideInLeft' : 'slideOutLeft'}
  duration={700}
  style={{  
    position: 'absolute',
    paddingTop: Platform.OS === 'ios' ? '25%' : '25%',
    paddingLeft:'8%',
    left: 0,
    top: Platform.OS === 'ios' ? '11.5%' : '7.8%',
    width: '40%',
    height: '100%',
    backgroundColor:'#F5F5F5',
    zIndex: 1,
  }}
>
  
  <TouchableOpacity style={styles.menuItem} onPress={onClose}>
    <Icon name="home" size={25} color="#000" />
    <Text style={styles.menuText}>Home</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem} onPress={() => navigation1.navigate('Historico')}>
    <Icon name="share-square" size={25} color="#000" /> 
    <Text style={styles.menuText}>Histórico</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem} onPress={() => navigation1.navigate('Chat',{ userId:userId ,userEmail : userEmail })}>
    <Icon name="comment" size={25} color="#000" /> 
    <Text style={styles.menuText}>Chat</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem} onPress={onSettingsPress}>
    <Icon name="cog" size={25} color="#000" /> 
    <Text style={styles.menuText}>Configurações</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem} onPress={() => navigation1.navigate('Logoff')}>
    <Icon name="sign-out-alt" size={25} color="#FF6347" /> 
    <Text style={styles.menuText}>Logoff</Text>
  </TouchableOpacity>
</Animatable.View>

);
}
const styles = StyleSheet.create({
menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Espaço entre os itens do menu
  },
  menuText: {
    marginLeft: 10, // Espaço entre o ícone e o texto
  },
}); 
