import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Insert from '../pages/Insert';
import DetalhesEntrega from '../pages/DetalhesEntrega';
import Historico from '../pages/Historico';
import Cadastro from '../pages/Cadastro';
import SideMenu from '../pages/Home/SideMenu';
import Logoff from '../pages/Logoff';
import ChatScreen from '../pages/Chat';




const Stack = createNativeStackNavigator();


export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />
            
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Insert"
                component={Insert}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetalhesEntrega"
                component={DetalhesEntrega}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Historico"
                component={Historico}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Logoff"
                component={Logoff}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
        
    )
}