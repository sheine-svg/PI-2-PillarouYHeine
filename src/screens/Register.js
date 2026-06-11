import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import Header from '../components/Header';

function Register(props) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [registerError, setRegisterError] = useState("");

    function onSubmit() {
        setRegisterError("");

        if (email === "" || password === "" || userName === "") {
            setRegisterError("Debes completar todos los campos")
            return
        }

        if (!email.includes("@")) {
            setRegisterError("El email debe incluir un @")
            return
        }

        if (password.length <= 5) {
            setRegisterError("La contraseña debe tener mínimo 6 caracteres")
            return
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                setRegister(true)
                props.navigation.navigate('Login');
                db.collection("users").add({
                    mail: auth.currentUser.email,
                    nombre: userName,
                    createdAt: Date.now(),
                })
            })
            .catch(error => {
                console.log(error.message);
                setRegisterError(error.message)
            })
    };

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.contenido}>
                <Text style={styles.titulo}>Registro</Text>

                <View style={styles.form}>
                    <TextInput style={styles.campo}
                        keyboardType='default'
                        placeholder='Ingresa un nombre de usuario'
                        onChangeText={text => setUserName(text)}
                        value={userName} />

                    <TextInput style={styles.campo}
                        keyboardType='email-address'
                        placeholder='Ingresa un Email'
                        onChangeText={text => setEmail(text)}
                        value={email} />

                    <TextInput style={styles.campo}
                        keyboardType='default'
                        placeholder='Ingresa una contraseña'
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password} />

                    <Text style={styles.error}>{registerError}</Text>

                    <Pressable
                        onPress={() => onSubmit()}
                        style={styles.boton}>
                        <Text style={styles.textoBoton}> Registrarse </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => props.navigation.navigate('Login')}
                        style={styles.botonDos}>
                        <Text style={styles.textoBotonDos}>Ya tengo una cuenta</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffffff"
    },
    contenido: {
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
    form: {
        padding: 20,
        borderRadius: 15,
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
})

export default Register;