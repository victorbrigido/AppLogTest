import React, { useState, StatusBar, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Addbutton from './Addbutton';
import SideMenu from './SideMenu';
import { ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PanResponder, Animated } from 'react-native';






export default function Home() {
 
  const navigation = useNavigation();
  const [entregas, setEntregas] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto
  const toggleMenu = () => {setMenuOpen(!menuOpen);};
  const closeMenu = () => {setMenuOpen(false);};
  const route = useRoute();
  const userId = route.params?.userId;
  const userEmail = route.params?.userEmail;

  
  

  const loadEntregas = async () => {
    try {
      const entregasData = await AsyncStorage.getItem('@savepass:descricao');
      if (entregasData) {
        const entregasArray = JSON.parse(entregasData);
        setEntregas(entregasArray);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleExcluirEntrega = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta entrega?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Filtra as entregas, removendo a que tem o mesmo id
            const novasEntregas = entregas.filter((entrega) => entrega.id !== id);
            setEntregas(novasEntregas);

            // Atualiza o AsyncStorage com a nova lista de entregas
            AsyncStorage.setItem('@savepass:descricao', JSON.stringify(novasEntregas))
              .then(() => {
                console.log('Entrega excluída com sucesso');
              })
              .catch((error) => {
                console.error('Erro ao excluir entrega:', error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEntregas();
    }, [])
  ); 
  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
    <View style={styles.container}>
      <SideMenu 
      isOpen={menuOpen}
      userId={userId}
      />
      <TouchableOpacity 
      onPress={toggleMenu}
      style={[styles.menuButton, Platform.OS === 'ios' && styles.menuButtonIOS]}>
        <Icon name="bars" size={25} color="#1E90FF" />
      </TouchableOpacity>
      <View style={styles.containerup}>
         {/*  <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Insert')}>
          <Icon name="history" size={25} color="blue" />
        </TouchableOpacity> */}
        <Text style={styles.textup}>Minhas Entregas</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historico')}>
          <Icon name="folder-plus" size={25} color="#1E90FF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.containerForm}>
      
      <Addbutton navigation={navigation}/>
         <FlatList
          data={entregas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.entregaContainer}
              onPress={() =>
                navigation.navigate('DetalhesEntrega', {
                  nomeEntrega: item.nomeEntrega,
                  enderecoEntrega: item.enderecoEntrega,
                  enderecoRetirada: item.enderecoRetirada,
                  descricao: item.descricao,
                })
              }
              onLongPress={() => handleExcluirEntrega(item.id)}

            >
            
              <Text style={styles.descricaonome}>{item.nomeEntrega}</Text>
              <View style={styles.enderecoContainer}>
                <View style={styles.caixaTexto1}>
                  <Text style={styles.textoCaixa}>Entrega</Text>
                </View>
                <View style={styles.enderecoTextContainer}>
                  <Text style={styles.endereco}>{item.enderecoEntrega}</Text>
                </View>
              </View>
              <View style={styles.enderecoContainer}>
                <View style={styles.caixaTexto2}>
                  <Text style={styles.textoCaixa}>Retirada</Text>
                </View>
                <View style={styles.enderecoTextContainer}>
                  <Text style={styles.endereco}>{item.enderecoRetirada}</Text>
                  
                </View>
              
              </View>
             
              <Text style={styles.descricao}>Descrição:{'\n'}
                <Text style={styles.descricaoItem}>{item.descricao}</Text>
              </Text>
            </TouchableOpacity>
     
          )}
      
        />
        
   
      </View>
      

    </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    flex: 1,
    backgroundColor: '#FFD700',
    padding: 'auto',
  },
  containerup: {
   // paddingTop: Platform.OS === 'ios' ? 30 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Alinha os itens verticalmente no centro
    paddingHorizontal: '5%',
  },
  containerForm: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: '2%',
    height: '83%',
   // borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textup: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '15%',
    marginHorizontal: '10%',
    marginBottom: '5%',
  },
  button: {
    paddingRight:'5%',
    paddingTop:'2%',
  },
  entregaContainer: {
    paddingLeft: '3%',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    borderColor: '#ccc',
  },
  descricao: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft:'7%',
  },
  descricaoItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#A9A9A9',
  },
  endereco: {
    fontSize: 16,
    color:'#696969',
  },
  enderecoentrega: {
    fontSize: 16,
  },
  descricaonome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:'1%',
    marginBottom:'3%',
    paddingLeft:'12%',
  },
  enderecoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alterado para 'space-between'
    marginBottom: 5,
  },
  caixaTexto1: {
    backgroundColor: '#F0E68C',
    padding: 10,
    borderRadius: 8,
    width:80,
  },
  caixaTexto2: {
    backgroundColor: '#DCDCDC',
    padding: 10,
    borderRadius: 8,
    width:80,
  },
  textoCaixa: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  enderecoTextContainer: {
    flex: 1,
    paddingLeft:'3%',
    paddingTop:'2%', // Adicionado para ocupar o espaço disponível
  },
  mapContainer: {
    backgroundColor:'blue',
    width:'100%',
    height:'30%',
  },
  menuButton: {
    height:50,
    width:58,
    borderTopRightRadius:16,
    borderBottomRightRadius:16,
    position: 'absolute',
    justifyContent: 'center', // Para centralizar o ícone verticalmente
    alignItems: 'center', // Para centralizar o ícone horizontalmente
    top: '5%', // Ajuste a posição conforme necessário
    left: '0%', // Ajuste a posição conforme necessário
    zIndex: 1,
    elevation:8,
    borderWidth: 1, // Espessura da borda
    borderColor: '#DCDCDC', // Cor da borda
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 4.84, // Raio da sombra
    padding: 10, // Espaçamento interno
    backgroundColor: 'white', // Cor de fundo
  },
  menuButtonIOS: {
    top: '8.5%', // Ajuste a posição no iOS conforme necessário
    left: '0%', // Ajuste a posição no iOS conforme necessário
  },

})