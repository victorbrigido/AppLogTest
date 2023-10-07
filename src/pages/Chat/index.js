import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { firestore } from '../../Config/firebase_config';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';



export default function ChatScreen() {
    const route = useRoute();
    const userId = route.params.userId;
    const userEmail = route.params.userEmail;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef(null);
    
    
    

    useEffect(() => {
        const q = query(collection(firestore, 'messages'), orderBy('timestamp' ));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const updatedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
          setMessages(updatedMessages);
        });
    
        return () => unsubscribe();
      }, []);

      const sendMessage = async () => {
        if (newMessage.trim() !== '') {
          try {
            await addDoc(collection(firestore, 'messages'), {
              text: newMessage,
              timestamp: serverTimestamp(),
              userId: userId, // Usando o userId recebido dos parâmetros de navegação
            });
            setNewMessage('');
            flatListRef.current.scrollToEnd({ animated: true });
          } catch (error) {
            console.error("Erro ao enviar mensagem: ", error);
          }
        }
      };

      useEffect(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, [messages]);


    


    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : null }
        style={{ 
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? '12%' : 6,
            backgroundColor: '#FFD700', 
            marginBottom: Platform.OS === 'ios' ? '6%' : 0,
            }}>
        
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Mensagens</Text>
           
            <FlatList
                ref={flatListRef}
                style={{ 
                    flex: 1,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 12 ,
                    borderTopRightRadius:12,
                    
                }}
                contentContainerStyle={{ 
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    backgroundColor:'white',
                     }}
                data={messages}
                keyExtractor={item => item.id}
                //inverted={true}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: item.userId === route.params.userId ? 'flex-end' : 'flex-start',
                        backgroundColor: item.userId === route.params.userId ? '#DCF8C6' : '#DCF8C6',
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 8,
                        marginLeft: item.userId === route.params.userId ? 0 : 8,
                        marginRight: item.userId === route.params.userId ? 8 : 0,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', top:-5, }}>
                            <Text style={{ color: 'blue', marginRight: 4, }}>
                                {item.userId.substring(0, 7)}:
                            </Text>
                            <Text style={{ fontSize: 16 }}>{item.text}</Text>
                        </View>
                        {item.timestamp && (
                            <View style={{ position: 'absolute', bottom: 2, right: 6, flexDirection: 'row'  }}>
                                <Text style={{ fontSize: 12, color: 'gray' }}>
                                    {item.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </View>
                        )}
                    </View>
  )}
                />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
               // height:'8%',
                //marginBottom:'2%',
               // marginBottom: Platform.OS === 'ios' ? '-10%' : 0,
            }}>
                <TextInput
                    multiline={true}
                    style={{ 
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 25,
                    padding: Platform.OS === 'ios' ? 12 : 8,
                    fontSize: 16,
                    marginLeft:'3%',
                    marginRight:'1%',
                    }}
                    value={newMessage}
                    onChangeText={text => setNewMessage(text)}
                    placeholder="  Digite sua mensagem"
                />
                <TouchableOpacity onPress={sendMessage} 
                style={{ 
                
                marginRight:'1%',
                padding: Platform.OS === 'ios' ? 10 : 12,
                backgroundColor: '#00BFFF', borderRadius: 30, 
                }}>
                <Icon name="paper-plane" size={22} color="white" />
                </TouchableOpacity>
                
            </View>
            
            </KeyboardAvoidingView>
            
    );
}
