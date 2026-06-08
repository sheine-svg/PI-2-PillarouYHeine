import { Text, View, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { useState } from "react";
import { db, auth } from "../firebase/config";

function MiPerfil() {
    const [perfil, setPerfil] = useState([]);

    db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
        docs => {
            let usuario = [];
            docs.forEach(doc => {
                usuario.push({
                    nombre: doc.data().nombre,
                    mail: doc.data().email,
                    // falta agregar posteos
                })
                setPerfil(usuario)
            })
        })

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mi Perfil</Text>

            <FlatList
                data={ perfil }
                renderItem={({ item }) => (
                    <View>
                        <Text>Usuario: {item.nombre}</Text>
                        <Text>Email: {item.mail}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 10
    },
})

export default MiPerfil;