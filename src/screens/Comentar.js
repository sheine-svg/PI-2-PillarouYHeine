import { Text, View, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

function Comentar() {
    return(
        <Text>Comentario</Text>
    )
}

export default Comentar;