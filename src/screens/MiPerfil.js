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

            <View>

                <FlatList
                    data={perfil}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.nombreUsu}>{item.nombre}</Text>
                            <Text style={styles.mailUsu}>{item.mail}</Text>
                        </View>
                    )}
                />
            </View>

            <Text style={styles.tituloDos}>Mis posteos</Text>

            <FlatList
                data={posteosUsuario}
                keyExtractor={posteo => posteo.id.toString()}
                renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation} />}
            />

            <Pressable
                onPress={() => logout()}
                style={styles.boton}>
                <Text style={styles.textoBoton}>Cerrar sesión</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 30,
        marginTop: 30,
        marginBottom: 15,
        color: "#2563EB",
        textAlign: "center"
    },
    tituloDos: {
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 30,
        marginBottom: 15,
        color: "#2563EB",
        marginLeft: 13
    },
    boton: {
        padding: 12,
        backgroundColor: "#2563EB",
        borderRadius: 15,
        alignItems: "center",
        margin: 8
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 16
    },
    mailUsu: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 5
    },
    nombreUsu: {
        fontSize: 25,
        marginLeft: 15,
        marginBottom: 5,
        fontWeight: "500"
    }
})

export default MiPerfil;