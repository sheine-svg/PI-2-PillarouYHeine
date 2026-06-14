import React from "react";
import HomePage from "../screens/HomePage";
import Comentar from "../screens/Comentar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Comentar" component={Comentar} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default HomeStack;