import { Text, View, StyleSheet, Pressable } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

function Post(props) {
    const likes = props.data.likes || [];
    const emailActual = auth.currentUser.email;
    const yaTieneLike = likes.includes(emailActual);

    function like() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(emailActual)
            })
            .then(res => console.log("like agregado"))
            .catch(e => console.log(e))
    }

    function sacarLike() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(emailActual)
            })
            .then(() => { console.log("like sacado") })
            .catch(e => console.log(e))
    }

    return (
        <View style={styles.post}>
            <Text style={styles.usuario}>{props.data.email}</Text>
            <Text style={styles.texto}>{props.data.descripcionPost}</Text>

            <Text style={styles.cantidadLikes}>{likes.length} likes</Text>

            <View style={styles.botonesLikeYComentario}>

                {
                    yaTieneLike
                        ? <Pressable onPress={() => sacarLike()} style={styles.boton}>
                            <Text style={styles.textoBoton}>❤️</Text>
                        </Pressable>
                        : <Pressable onPress={() => like()} style={styles.boton}>
                            <Text style={styles.textoBoton}>🩶</Text>
                        </Pressable>
                }
                <Pressable onPress={() => props.navigation.navigate("Comentar", { idPosteo: props.id })} style={styles.boton} >
                    <Text style={styles.textoBoton}>💬</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "#F5F6FA",
        padding: 15,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 12,
        borderColor: "#E5E7EB"
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
    cantidadLikes: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 8,
    },
    boton: {
        padding: 10,
        backgroundColor: "#2563EB",
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "flex-start",
        marginRight: 8,
        marginTop: 6
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 14,
    },
    botonesLikeYComentario: {
        flex: 1,
        flexDirection: "row"
    }
});

export default Post;