import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function Insert({navigation}) {
  const [descricao, setDescricao] = useState('');
  const [enderecoRetirada, setEnderecoRetirada] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState('');
  const [nomeEntrega, setNomeEntrega] = useState('');
  const navigation2 = useNavigation();
  const [limparInputs, setLimparInputs] = useState(false);
  

  function showToast () { 
    ToastAndroid.show('Salvo com sucesso!', ToastAndroid.SHORT);
  }
   
  const adicionarEntrega = async () => {
    if (!descricao || !enderecoRetirada || !enderecoEntrega || !nomeEntrega ) {
      showToast('Por favor, preencha todos os campos.');
      return;
    }
  

      const novaEntrega = {
        id: Date.now().toString(),
        nomeEntrega,
        descricao,
        enderecoRetirada,
        enderecoEntrega,
      };

      console.log('Dados Digitados:', novaEntrega);
  
    try {

      // Chame a função adicionarEntregaFirebase
      //await adicionarEntregaFirebase(novaEntrega);
  
      let entregasAtuais = await AsyncStorage.getItem('@savepass:descricao');
      entregasAtuais = entregasAtuais ? JSON.parse(entregasAtuais) : [];
  
      if (!Array.isArray(entregasAtuais)) {
        entregasAtuais = [];
      }
  
      entregasAtuais.push(novaEntrega);
      await AsyncStorage.setItem('@savepass:descricao', JSON.stringify(entregasAtuais));
      showToast();
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const handleCancelar = () => {
    setDescricao('');
    setEnderecoRetirada('');
    setEnderecoEntrega('');
    setNomeEntrega('');
    setLimparInputs(true);
    navigation.goBack(); // Adicione esta linha se desejar voltar para a tela Home ao cancelar
  };
  

  return (

    <View style={styles.container}>
      <View style={styles.containerHeader}>
      <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation2.navigate('Home')}>
         <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>

        <Text style={styles.message}>Nova Entrega</Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {adicionarEntrega(); showToast();}}>
         <Icon name="check" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.containerForm}>
      <TextInput
          placeholder="Nome ou estabelecimento"
          style={styles.input}
          value={nomeEntrega}
          onChangeText={(text) => setNomeEntrega(text)}
        />
        <TextInput
          placeholder="Endereço de Entrega"
          style={styles.input}
          value={enderecoEntrega}
          onChangeText={(text) => setEnderecoEntrega(text)}
        />
        <TextInput
          placeholder="Endereço de retirada"
          style={styles.input}
          value={enderecoRetirada}
          onChangeText={(text) => setEnderecoRetirada(text)}
        />
        <TextInput
          multiline
          numberOfLines={4}
          placeholder=" Descrição"
          style={styles.input2}
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
        />
        

        <TouchableOpacity
          style={styles.button}
          onPress={handleCancelar}
        >
          <Text style={styles.buttonText2}>Cancelar</Text>
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
    },
    containerHeader:{
        flexDirection:'row',
        alignContent:'center',
        marginTop:'5%',
        marginBottom:'5%',
    },
    message:{
        fontSize:24,
        fontWeight:'bold',
        marginLeft:'20%',
    },
    button1:{
      marginLeft:'18%',
    },
    button2:{
      marginTop:'1%',
      marginLeft:'6%',
    },
    containerForm:{
        backgroundColor:'#FFF',
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart:'5%',
        paddingTop:'5%',
        paddingEnd:'5%',
    },
    input2:{
        borderBottomWidth:1,
        borderTopWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomColor:'#DCDCDC',
        borderTopColor:'#DCDCDC',
        borderLeftColor:'#DCDCDC',
        borderRightColor:'#DCDCDC',
        height:150,
        marginBottom:12,
        fontSize:16,
    },
    input:{
        borderBottomWidth:1,
        borderBottomColor:'#DCDCDC',
        height:40,
        marginBottom:12,
        fontSize:16,
    },
    buttonText2:{
        color:'#FF0000',
        fontSize:18,
    },
    button:{
        backgroundColor:'#FFE4C4',
        width:'100%',
        borderRadius:4,
        paddingVertical:8,
        marginTop:14,
        justifyContent:'center',
        alignItems:'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top:'auto',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        color:'white',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      modalButton: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        color: 'black',
        marginRight:8,
        marginLeft:8,
      },
})