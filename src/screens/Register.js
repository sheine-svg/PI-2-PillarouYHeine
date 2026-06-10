import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";

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
                setRegisterError('Fallo en el registro.')
            })
    };

    /* En caso de error en los campos de email o contraseña debe mostrarse el 
    mensaje al usuario con el tipo de error recibido de Firebase
    
    estamos mostrando el mensaje "fallo en el registro", tendriamos que poner en el estado solo error?
     */

    return (
        <View style={styles.container}>
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

                <Pressable onPress={() => onSubmit()}
                    style={styles.boton}>
                    <Text style={styles.textoBoton}> Registrarse </Text>
                </Pressable>
                <Pressable
                    onPress={() => props.navigation.navigate('Login')}
                    style={styles.boton}>
                    <Text style={styles.textoBoton}>Ya tengo una cuenta</Text>
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

export default Register;