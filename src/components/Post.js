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
            .then(() => { console.log("like agregado") })
            .catch(e => console.log(e))
    }

    return (
        <View style={styles.post}>
            <Text style={styles.usuario}>{props.data.email}</Text>
            <Text style={styles.texto}>{props.data.descripcionPost}</Text>

            {/* lo de la imagen / cámara */}

            <Text style={styles.cantidadLikes}>{likes.length} likes</Text>

            {
                yaTieneLike
                    ? <Pressable onPress={() => sacarLike()} style={styles.boton}>
                        <Text style={styles.textoBoton}>Sacar like</Text>
                    </Pressable>
                    : <Pressable onPress={() => like()} style={styles.boton}>
                        <Text style={styles.textoBoton}>Like</Text>
                    </Pressable>
            }

            {/* botón de comentar */}
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
    cantidadLikes: {
        fontSize: 13,
        color: "#6b7280",
        marginBottom: 8,
    },
    boton: {
        padding: 10,
        backgroundColor: "rgba(42, 84, 237, 0.74)",
        borderRadius: 4,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#ffffff",
    }
});

export default Post;