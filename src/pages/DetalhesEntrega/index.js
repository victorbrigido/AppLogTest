import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, TouchableHighlight } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addDoc, doc, deleteDoc, collection, getDocs, getDoc} from "firebase/firestore";
import { firestore } from '../../Config/firebase_config';






export default function DetalhesEntrega({ route }) {

  const { descricao, enderecoRetirada, enderecoEntrega, nomeEntrega } = route.params;
  const navigation = useNavigation();
  const openImagePicker = () => {
    const options = {
      title: 'Selecione uma imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar Foto',
      chooseFromLibraryButtonTitle: 'Escolher da Galeria',
      mediaType: 'photo',
      quality: 1,
    };
  
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção de imagem');
      } else if (response.error) {
        console.log('Erro ao selecionar imagem: ', response.error);
      } else {
        // 'response' contém a informação sobre a imagem selecionada
        console.log('ImagePicker response: ', response);
      }
    });
  };

  const abrirNoMapa = (endereco) => {
    const enderecoEncoded = encodeURIComponent(endereco);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${enderecoEncoded}`;
    const wazeUrl = `https://waze.com/ul?q=${enderecoEncoded}`;

    Linking.canOpenURL(googleMapsUrl).then((googleMapsSupported) => {
      Linking.canOpenURL(wazeUrl).then((wazeSupported) => {
        if (googleMapsSupported && wazeSupported) {
          Alert.alert(
            'Escolha o aplicativo de navegação',
            'Qual aplicativo você gostaria de usar para abrir o endereço?',
            [
              {
                text: 'Google Maps',
                onPress: () => Linking.openURL(googleMapsUrl),
              },
              {
                text: 'Waze',
                onPress: () => Linking.openURL(wazeUrl),
              },
            ]
          );
        } else if (googleMapsSupported) {
          Linking.openURL(googleMapsUrl);
        } else if (wazeSupported) {
          Linking.openURL(wazeUrl);
        } else {
          Alert.alert('Nenhum aplicativo de navegação está instalado.');
        }
      });
    });
  };

  const finalizarEntrega = async () => {
    try {
      const entregasAtuais = await AsyncStorage.getItem('@savepass:descricao');
      const historicoAntigo = await AsyncStorage.getItem('@savepass:historico');

      const entregas = entregasAtuais ? JSON.parse(entregasAtuais) : [];
      const historico = historicoAntigo ? JSON.parse(historicoAntigo) : [];

      // Encontrar a entrega atual na lista de entregas
      const entrega = entregas.find(e => e.descricao === descricao);

      if (entrega) {
        
        //adiciona a data e hora
        const dataFinalizacao = new Date();
        entrega.dataFinalizacao = dataFinalizacao.toISOString(); // Salva no formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
        
        // Adicionar a entrega ao histórico
        historico.push(entrega);

        // Remover a entrega da lista atual
        const index = entregas.indexOf(entrega);
        entregas.splice(index, 1);

        // Atualizar AsyncStorage
        await AsyncStorage.setItem('@savepass:descricao', JSON.stringify(entregas));
        await AsyncStorage.setItem('@savepass:historico', JSON.stringify(historico));

        // Adicionar a entrega ao histórico no Firestore
        await adicionarEntregaAoHistorico(entrega);

        // Navegar de volta para a tela anterior
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao finalizar entrega:', error);
    }
  };

const adicionarEntregaAoHistorico = async (entrega) => {

  try {
    
    // Adicionar a entrega ao histórico no Firestore
    const historicoRef = collection(firestore, 'historico'); // Substitua 'historico' pelo nome da sua coleção
    await addDoc(historicoRef, entrega);
    setHistorico((prevHistorico) => [...prevHistorico, entrega]);
  } catch (error) {
    console.error('Erro ao adicionar entrega ao histórico:', error);
  }
}




  return (
    <View style={styles.container}>
      <View style={styles.containerup}>
        <Text style={styles.textup}>Detalhes da Entrega</Text>
        <TouchableOpacity
          style={[styles.button, Platform.OS === 'ios' && styles.backButtonIOS]}
          onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" size={25} color="#696969" />
        </TouchableOpacity>
      </View>

      <View style={styles.containerForm}>
      <View>
      <Text style={styles.nomeentrega}>{nomeEntrega}</Text>
      <TouchableHighlight 
          style={styles.enderecoContainer}
          onPress={() => abrirNoMapa(enderecoEntrega)}>
        <View style={styles.enderecoBox}>
          <Text style={styles.enderecoLabel}>Endereço de Entrega:</Text>
          <Text>{enderecoEntrega}</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight 
          style={styles.enderecoContainer}
          onPress={() => abrirNoMapa(enderecoRetirada)}>
        <View style={styles.enderecoBox1}>
          <Text style={styles.enderecoLabel}>Endereço de Retirada:</Text>
          <Text>{enderecoRetirada}</Text>
        </View>
      </TouchableHighlight>

      <Text style={styles.descricao}>Descrição:</Text>
      <Text style={styles.textodescricao}>{descricao}</Text>
    </View>
  
            <TouchableOpacity style={styles.anexoButton}>
            <Text style={styles.buttonText3}>Anexar Comprovante</Text>
            </TouchableOpacity>

        
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
        style={styles.redButtonContainer}
        onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText2}>Cancelar Entrega</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenButtonContainer} onPress={async () => { 
            await finalizarEntrega(); 
            await adicionarEntregaAoHistorico();
                }}>
            <Text style={styles.buttonText2}>Finalizar Entrega</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
        flex:1,
        backgroundColor:'#FFD700',
        padding:'auto',
    },    
    containerup:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:'5%',
      marginBottom:'5%',
      paddingStart:'10%',
    },
    textup:{
      fontSize:24,
      fontWeight:'bold',
    },
    containerForm:{
     //   marginHorizontal:'auto',
        backgroundColor:'white',
        width:'100%',
        paddingTop:'5%',
        paddingStart:'0%',
        height:'84%',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    button:{
      paddingTop:'2%',
      marginLeft:'28%',
    },
    buttonText:{
        color:'#0000FF',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:'8%',
    },
    greenButtonContainer: {
        backgroundColor: 'green',
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    
    redButtonContainer: {
        backgroundColor: 'red',
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    buttonText2: {
        color: 'white',
        fontSize: 18,
      },
    anexoButton: {
        backgroundColor:'#EDEDED',
        marginTop:'80%',
        padding:'3%',
        borderRadius: 8,
        alignItems: 'center',
        marginRight:'1%',
        marginLeft:'1%',
    },
    buttonText3: {
        color: 'blue',
        fontSize: 18,
    },
    nomeentrega:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:'15%',
        marginTop:'5%',
        marginBottom:'5%',
    },
    enderecoContainer: {
      marginVertical: 3,
    },
    enderecoBox: {
      backgroundColor: '#FAFAD2',
      padding: 15,
      marginLeft:'2%',
      borderRadius: 8,
      width: '96%',
    },
    enderecoBox1: {
      backgroundColor: '#F0F0F0',
      padding: 15,
      marginLeft:'2%',
      borderRadius: 8,
      width: '96%',
    },
    enderecoLabel: {
      fontWeight: 'bold',
    },
    descricao:{
      fontWeight:'bold',
      marginLeft:'5%',
      marginTop:'2%',
    },
    textodescricao:{
      marginTop:'2%',
      marginLeft:'8%',
    },
    backButtonIOS:{ 
      paddingTop:'2%',
      marginLeft:'22%',
    }
})
