import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

export default function Logoff() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectado com sucesso');
        navigation.navigate('Welcome'); // Navega para a tela de boas-vindas ou qualquer outra tela apropriada após o logout
      })
      .catch((error) => {
        console.error('Erro ao desconectar o usuário:', error);
      });
  };





  return (
    <View style={styles.container}>
      <Animatable.View animation="flipInY" style={styles.containerLogo}>
        <Text style={styles.title}>Tem certeza que deseja sair?</Text>
      </Animatable.View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.goBack()} // Volta para a tela anterior ao pressionar "Não"
        >
          <Text style={styles.buttonTextOutline}>Não</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    paddingTop:'20%',
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonTextOutline: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
