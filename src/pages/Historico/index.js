import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';
import styles1 from './styles';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../Config/firebase_config';



export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const SeloConcluido = () => {
    return (
      <View style={styles.seloContainer}>
        <Image source={require('../Historico/green-check.png')} style={styles.checkIcon} />
      </View>
    );
  };




  const compartilharHistoricoPDF = async () => {
    try {
      const historicoString = JSON.stringify(historico, null, 2);
      const historicoList = `
      <html>
        <head>
          <style>
            ${styles1}
          </style>
        </head>
        <body>
          <div class="container">
            <pre>${historicoString}</pre> <!-- Adiciona o histórico como uma string formatada -->
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: historicoList });
    await shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Compartilhar PDF' });
  } catch (error) {
    console.error('Erro ao compartilhar histórico em PDF:', error);
  }
};

  

  useEffect(() => {

          const historicoRef = collection(firestore, 'historico'); // Substitua 'historico' pelo nome da sua coleção
          const unsubscribe = onSnapshot(historicoRef, (snapshot) => {
          const updatedHistorico = [];
          snapshot.forEach((doc) => {
            updatedHistorico.push({ id: doc.id, ...doc.data(), });
          });
          setHistorico(updatedHistorico);
        });

        // Certifique-se de se desinscrever quando o componente for desmontado
        return () => unsubscribe();
        },[]);
        
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>Histórico de Entregas</Text>
      <TouchableOpacity 
      style={styles.button}
      onPress={compartilharHistoricoPDF}>
      <Icon name="share-alt" size={20} color="#1E90FF" />
      </TouchableOpacity>
      </View>

      <View style={styles.containerForm}>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.itemContainer}>
            <View style={styles.itemContainer2}>
            <Text style={styles.descricaonome}>{item.nomeEntrega}</Text>
            <SeloConcluido />
            </View>
            <Text style={styles.enderecoEntrega}>Endereço de Entrega: {item.enderecoEntrega}</Text>
            <Text style={styles.enderecoRetirada}>Endereço de Retirada: {item.enderecoRetirada}</Text>
            <Text style={styles.descricao}>Descrição: {item.descricao}</Text>
            <Text style={styles.dataFinalizacao}>{new Date(item.dataFinalizacao).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FFD700',
    flex:1,
    width:'100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  containerForm:{
    backgroundColor:'white',
    paddingTop:'1%',
    paddingBottom:'15%',
    height:'100%',
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
  },
  title: {
    paddingTop:'4%',
    paddingBottom:'4%',
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft:'10%',
  },
  itemContainer: {
    paddingTop:'4%',
  },
  descricao: {
    fontSize: 16,
    paddingLeft:'3%',
  },
  dataFinalizacao:{
    paddingTop:'2%',
    paddingBottom:'2%',
    paddingLeft:'6%',
    color:'#A9A9A9',
    borderBottomWidth: 1,
    borderBottomColor:'#DCDCDC',
  },
  enderecoRetirada: {
    fontSize: 16,
    paddingLeft:'3%',
  },
  enderecoEntrega: {
    paddingLeft:'3%',
    fontSize: 16,
  },
  descricaonome:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:'4%',
  },
  checkIcon:{
    width: 15, // Largura da imagem
    height: 15, // Altura da imagem
  },
  seloContainer: {  
    height:'50%',
    width:'7%',
    marginRight:'90%',
    paddingLeft:'2%',
    marginTop:'1%',
  },
  itemContainer2:{
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft:'8%',
  },
  button:{
    marginRight:'10%',
  },
  header: {
    backgroundColor:'#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
