import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'
import { auth } from '../../Config/firebase_config';
import { createUserWithEmailAndPassword } from 'firebase/auth';



export default function Cadastro(){
    const [userMail, setuserMail] = useState('');
    const [userPass, setuserPass] = useState('');
    const [userRePass, setuserRePass] = useState('');
    const navigation = useNavigation();

    function newUser(){
       if(userMail ==='' || userPass ===''){
        alert('Todos os campos devem ser preenchidos')
        return;
       }
       if(userPass !== userRePass){
        alert('a senha e a confirmação de senha não são iguais.');
        return;
       } else {
        createUserWithEmailAndPassword(auth, userMail, userPass)
        .then((UserCredencial) => {
            const user = UserCredencial.user;
            const userEmail = user.email;
            alert('O usuario ' + userMail + ' foi cadastrado. Faça o login');
            navigation.navigate('SignIn');
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
       }

    }

    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <Text style={styles.message}>Cadastre-se</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email.."
                    keyboardType="email-address"
                    autoComplete="email"
                    style={styles.input}
                    value={userMail}
                    onChangeText={setuserMail}  
                />
                <Text style={styles.title}>Digite uma senha</Text>
                <TextInput
                    placeholder="Sua senha"
                    style={styles.input}
                    secureTextEntry
                    value={userPass}
                    onChangeText={setuserPass}
                />
                <Text style={styles.title}>Confirme sua senha</Text>
                <TextInput
                    placeholder="Confirme sua senha"
                    style={styles.input}
                    secureTextEntry
                    value={userRePass}
                    onChangeText={setuserRePass}
                />

            <TouchableOpacity 
                style={styles.button}
                onPress={newUser}
            >
                <Text style={styles.buttonText}>Cadastar</Text>
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
        borderBottomColor:'#DCDCDC',
        height:40,
        marginBottom:12,
        fontSize:16,
    },
    button:{
        backgroundColor:'#6495ED',
        borderRadius:'50%',
        width:'100%',
        borderRadius:4,
        paddingVertical:8,
        marginTop:14,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        color:'white',
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