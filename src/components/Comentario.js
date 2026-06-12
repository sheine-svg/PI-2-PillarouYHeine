import { Text, View, StyleSheet } from 'react-native';

function Comentario(props) {
    return (
        <View style={styles.comentario}>
            <Text style={styles.usuario}>{props.data.email}</Text>
            <Text style={styles.texto}>{props.data.comentario}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    comentario: {
        backgroundColor: "#F5F6FA",
        padding: 15,
        marginVertical: 6,
        marginHorizontal: 10,
        marginTop: 5,
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
});

export default Comentario;