import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import CrearPosteo from '../screens/CrearPosteo';
import MiPerfil from '../screens/MiPerfil';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, }}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
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