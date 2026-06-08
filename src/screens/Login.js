import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

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
                setLoginError('Credenciales inválidas.')
            })
    };

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                props.navigation.navigate('HomeMenu')
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.form}>
                <TextInput style={styles.campo}
                    keyboardType='email-address'
                    placeholder='Ingresa tu Email'
                    onChangeText={text => setEmail(text)}
                    value={email} />
                <TextInput style={styles.campo}
                    keyboardType='default'
                    placeholder='Ingresa una contraseña'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password} />

                <Text style={styles.error}>{loginError}</Text>

                <Pressable onPress={() => onSubmit()}
                    style={styles.botonApp}>
                    <Text style={styles.textoBoton} > Login </Text>
                </Pressable>
                <Pressable
                    onPress={() => props.navigation.navigate('Register')}
                    style={styles.botonRegister}>
                    <Text style={styles.textoBoton}>No tengo cuenta</Text>
                </Pressable>
                <Pressable
                    onPress={() => props.navigation.navigate('HomeMenu')}
                    style={styles.botonRegister}>
                    <Text style={styles.textoBoton}>Ir a Home</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 50,
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 16,
        marginBottom: 10,
    },
    botonRegister: {
        padding: 12,
        backgroundColor: "#4FB3D9",
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 10,
    },
    botonApp: {
        padding: 12,
        backgroundColor: "#F5A623",
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 10,
    },
    textoBoton: {
        fontWeight: "bold",
        fontSize: 16,
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
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 12,
    },
    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    }
});

export default Login;