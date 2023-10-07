import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'
import { auth } from '../../Config/firebase_config';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';




export default function SignIn(){
    const [userMail, setuserMail] = useState('');
    const [userPass, setuserPass] = useState('');
    const navigation1 = useNavigation(); 
    
    



    function userLogin(){
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // Usuário está autenticado, 'user' conterá informações sobre o usuário
              console.log('Usuário autenticado:', user.email);
            }
          });




        
        signInWithEmailAndPassword(auth, userMail, userPass)
        .then((userCredential) => {
            const user = userCredential.user;
           // const userEmail = user.Email;
            const userId = user.email; // Obtém o ID do usuário
            navigation1.navigate('Home',{ userId, userEmail: userMail });
            })
        .catch((error) => {
            alert('Erro ao efetuar o login: ' + error.message);
        });
    }
    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <Text style={styles.message}>Bem-Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email.."
                    style={styles.input}
                    value={userMail}
                    onChangeText={setuserMail}  
                />
                                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Sua senha"
                    style={styles.input}
                    secureTextEntry
                    value={userPass}
                    onChangeText={setuserPass}
                />

            <TouchableOpacity 
                style={styles.button}
                onPress={userLogin}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonResgister}
                onPress={() => navigation1.navigate('Cadastro')}
            >
                <Text style={styles.registerText}>Ainda não sou cadastrado, cadastre-se</Text>
            </TouchableOpacity>

            </Animatable.View>


        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFD700',
    },
    containerHeader:{
        marginTop:'14%',
        marginBottom:'8%',
        paddingStart:'5%',
    },
    message:{
        fontSize:28,
        fontWeight:'bold',
    },
    containerForm:{
        backgroundColor:'#FFF',
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart:'5%',
        paddingEnd:'5%',
    },
    title:{
        fontSize:20,
        marginTop:28,
    },
    input:{
        borderBottomWidth:1,
        height:40,
        marginBottom:12,
        fontSize:16,
    },
    button:{
        backgroundColor:'#FFD700',
        width:'100%',
        borderRadius:4,
        paddingVertical:8,
        marginTop:14,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        color:'#000000',
        fontSize:18,
        fontWeight:'bold',
    },
    buttonResgister:{
        marginTop:14,
        alignSelf:'center',
    },
    registerText:{
        color:'#a1a1a1'
    }
})