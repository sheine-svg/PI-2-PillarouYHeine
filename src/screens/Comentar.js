import { Text, View, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import Comentario from '../components/Comentario';

function Comentar(props) {
    const [comentario, setComentario] = useState("");
    const [todosLosComentarios, setTodosLosComentarios] = useState([]);

    useEffect(() => {
        db.collection("posts").onSnapshot(
            docs => {
                let comentarios = [];
                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setTodosLosComentarios(comentarios)
            }
        )
    }, []);

    function agregarComentario() {
        db.collection("posts")
            .doc(props.id)
            .update({
                comentario: firebase.firestore.FieldValue.arrayUnion(comentario)
            })
            .then(res => console.log("comentario agregado"))
            .catch(e => console.log(e))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Nuevo comentario</Text>

            <View style={styles.form}>
                <TextInput style={styles.campo}
                    keyboardType='default'
                    placeholder='Ingresa tu comentario'
                    onChangeText={text => setComentario(text)}
                    value={comentario} />

                <Pressable onPress={() => agregarComentario()}
                    style={styles.boton}>
                    <Text style={styles.textoBoton} > Publicar comentario </Text>
                </Pressable>

                <FlatList
                    data={todosLosComentarios}
                    keyExtractor={comentarios => comentarios.id.toString()}
                    renderItem={({ item }) => <Comentario data={item.data} id={item.id} />}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    boton: {
        padding: 12,
        backgroundColor: "rgba(42, 84, 237, 0.74)",
        borderRadius: 4,
        alignItems: "center",
        margin: 10
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 16
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 10
    },
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 12,
    },
    campo: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: "#ffffff",
        color: "#111827",
        marginBottom: 12,
    },
    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    }
})

export default Comentar;