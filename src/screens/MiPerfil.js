import { Text, View, StyleSheet, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";

function MiPerfil(props) {
    const [perfil, setPerfil] = useState([]);

    useEffect(() => {
        db.collection("users").where("mail", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let usuario = [];
                docs.forEach(doc => {
                    usuario.push({
                        nombre: doc.data().nombre,
                        mail: doc.data().mail,
                        // falta agregar posteos
                    })
                    setPerfil(usuario)
                })
            })
    }, []);

    function logout() {
        auth.signOut();
        props.navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mi Perfil</Text>

            <FlatList
                data={perfil}
                renderItem={({ item }) => (
                    <View>
                        <Text>Usuario: {item.nombre}</Text>
                        <Text>Email: {item.mail}</Text>
                    </View>
                )}
            />

            <Pressable
                onPress={() => logout()}
                style={styles.boton}>
                <Text style={styles.textoBoton}>Desloguearse</Text>
            </Pressable>
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
    boton: {
        padding: 12,
        backgroundColor: "#F5A623",
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 10,
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 16,
    }
})

export default MiPerfil;