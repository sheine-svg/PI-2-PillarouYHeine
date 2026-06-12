import { Text, View, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import Comentario from '../components/Comentario';

function Comentar(props) {
    const [comentario, setComentario] = useState("");
    const [todosLosComentarios, setTodosLosComentarios] = useState([]);

    const idPosteo = props.route.params.idPosteo;

    useEffect(() => {
        db.collection("posts")
            .doc(idPosteo)
            .onSnapshot( doc => {
                setTodosLosComentarios(doc.data().todosLosComentarios || []);
            })
    }, []);

    function agregarComentario() {
        db.collection("posts")
            .doc(idPosteo)
            .update({
                todosLosComentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    comentario: comentario,
                    createdAt: Date.now(),
                })
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
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Comentario data={item} />}
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
        backgroundColor: "#2563EB",
        borderRadius: 15,
        alignItems: "center",
        marginTop: 4
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