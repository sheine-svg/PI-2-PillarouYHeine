import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import Header from '../components/Header';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [loginError, setLoginError] = useState("");

    function onSubmit() {
        setLoginError("");

        if (!email.includes("@")) {
            setLoginError("Email mal formateado");
            return
        }

        if (password.length < 6) {
            setLoginError("La contraseña debe tener una longitud mínima de 6 caracteres");
            return
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                setLogin(true);
                props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                setLoginError('Credenciales inválidas')
            })
    };

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate('HomeMenu')
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.contenido}>
                <Text style={styles.titulo}>Iniciar sesión</Text>

                <View style={styles.form}>

                    <TextInput style={styles.campo}
                        keyboardType='email-address'
                        placeholder='Ingrese su email'
                        onChangeText={text => setEmail(text)}
                        value={email} />

                    <TextInput style={styles.campo}
                        keyboardType='default'
                        placeholder='Ingrese su contraseña'
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password} />

                    <Text style={styles.error}>{loginError}</Text>

                    <Pressable onPress={() => onSubmit()}
                        style={styles.boton}>
                        <Text style={styles.textoBoton}>Ingresar</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => props.navigation.navigate('Register')}
                        style={styles.botonDos}>
                        <Text style={styles.textoBotonDos}>No tengo cuenta</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    contenido:{
        padding: 20,
        marginTop: 20
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
    campo: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 15,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 12,
    },
    form: {
        padding: 20,
        borderRadius: 15,
    },
    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    },
    botonDos: {
        padding: 14,
        borderWidth: 1,
        borderColor: "#2563EB",
        borderRadius: 15,
        alignItems: "center",
        marginTop: 12,
    },
    textoBotonDos: {
        color: "#2563EB",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Login;