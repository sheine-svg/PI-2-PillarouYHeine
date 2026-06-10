import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useState } from "react";
import { db, auth } from "../firebase/config";

function NuevoPost(props) {
    const [descripcion, setDescripcion] = useState("");

    function onSubmit() {
        db.collection("posts").add({
            email: auth.currentUser.email,
            descripcionPost: descripcion,
            likes: [],
            comentarios: [],
            createdAt: Date.now(),
        })
        .then(res => {props.navigation.navigate('Home');}
        )
        .catch( error => console.log(error))
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Nuevo post</Text>

            <View style={styles.form}>
                <TextInput style={styles.campo}
                    keyboardType='default'
                    placeholder='Ingresa tu nuevo post'
                    onChangeText={text => setDescripcion(text)}
                    value={descripcion} />

                <Pressable onPress={() => onSubmit()}
                    style={styles.boton}>
                    <Text style={styles.textoBoton} > Publicar post </Text>
                </Pressable>
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

export default NuevoPost;