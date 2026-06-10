import { Text, View, StyleSheet, Pressable } from 'react-native';
import { db, auth } from "../firebase/config";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';

const Stack = createNativeStackNavigator();

function Comentario(props) {
    return (
        <View style={styles.post}>
            <Text style={styles.usuario}>{props.data.email}</Text>
            <Text style={styles.texto}>{props.data.comentario}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "#ffffff",
        padding: 15,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    usuario: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 4,
    },
    texto: {
        fontSize: 16,
        marginBottom: 8
    },
});

export default Comentario;