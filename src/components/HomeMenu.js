import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import CrearPosteo from '../screens/CrearPosteo';
import MiPerfil from '../screens/MiPerfil';
import Comentar from '../screens/Comentar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeMenu() {

    function HomePageStackNavigation() {
        return(
            <Stack.Navigator>
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="Comentar" component={Comentar} />
            </Stack.Navigator>
        )
    }
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false,}}>
            <Tab.Screen
                name="Home"
                component={HomePageStackNavigation}
                options={
                    { tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }
                }
            />
            <Tab.Screen
                name="CrearPosteo"
                component={CrearPosteo}
                options={
                    { tabBarIcon: () => <FontAwesome name="plus-square-o" size={24} color="black" /> }
                }
            />
            <Tab.Screen
                name="MiPerfil"
                component={MiPerfil}
                options={
                    { tabBarIcon: () => <Ionicons name="person" size={24} color="black" /> }
                }
            />
        </Tab.Navigator>
    )
}

export default HomeMenu;