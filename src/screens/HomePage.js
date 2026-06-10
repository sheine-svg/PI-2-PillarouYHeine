import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import Post from '../components/Post';

function HomePage(props) {
    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosteos(posts)
                setLoading(false)
            }
        );
    }, []);

    if (loading) {
        return (<Text style={styles.cargando}>Cargando...</Text>)
    }

    return (
        <View style={styles.flatlist}>

            <Text style={styles.titulo}>Todos los posteos</Text>

            <FlatList
                data={posteos}
                keyExtractor={posteo => posteo.id.toString()}
                renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 10,
    },
    cargando: {
        fontSize: 40,
        alignSelf: "center"
    }
});

export default HomePage;