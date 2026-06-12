import { Text, View, StyleSheet, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import Post from '../components/Post';

function MiPerfil(props) {
    const [perfil, setPerfil] = useState([]);
    const [posteosUsuario, setPosteosUsuario] = useState([]);

    useEffect(() => {
        db.collection("users").where("mail", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let usuario = [];
                docs.forEach(doc => {
                    usuario.push({
                        nombre: doc.data().nombre,
                        mail: doc.data().mail,
                    })
                    setPerfil(usuario)
                })
            })

        db.collection("posts")
            .where("email", "==", auth.currentUser.email).onSnapshot(
                docs => {
                    let posts = [];
                    docs.forEach(doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    setPosteosUsuario(posts)
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
                        <Text style={styles.datosUsuario}>Usuario: {item.nombre}</Text>
                        <Text style={styles.datosUsuario}>Email: {item.mail}</Text>
                    </View>
                )}
            />

            <FlatList
                data={posteosUsuario}
                keyExtractor={posteo => posteo.id.toString()}
                renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation} />}
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
        backgroundColor: "#ffffffff"
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 15,
        color: "#2563EB",
        textAlign: "center"
    },
    boton: {
        padding: 12,
        backgroundColor: "#2563EB",
        borderRadius: 15,
        alignItems: "center",
        marginTop: 4
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 16
    },
    datosUsuario: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 15,
    },
})

export default MiPerfil;