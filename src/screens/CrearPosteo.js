import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useState } from "react";
import { db, auth } from "../firebase/config";

function NuevoPost(props) {
    const [descripcion, setDescripcion] = useState("");
    const [mjeError, setMjeError] = useState("");

    function onSubmit() {
        if (descripcion === ""){
            setMjeError("El post no puede estar vacío");
            return;
        }

        db.collection("posts").add({
            email: auth.currentUser.email,
            descripcionPost: descripcion,
            likes: [],
            todosLosComentarios: [],
            createdAt: Date.now(),
        })
        .then(res => {
            setDescripcion("");
            setMjeError("");
            props.navigation.navigate('HomeStack');
        })
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

                {mjeError !== "" ? <Text style={styles.error}>{mjeError}</Text> : null}

                <Pressable onPress={() => onSubmit()}
                    style={styles.boton}>
                    <Text style={styles.textoBoton}>Publicar post</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
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
        fontSize: 30,
        marginBottom: 15,
        color: "#2563EB",
        textAlign: "center"
    },
    form: {
        padding: 20,
        borderRadius: 15,
    },
    campo: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#F5F6FA",
        borderRadius: 15,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 12,
        height: 80,
    },
    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    }
})

export default NuevoPost;