import { View, StyleSheet, Image } from 'react-native';

function Header() {
    return (
        <View style={styles.header}>
            <Image style={styles.logo}
                source={require('../../assets/postly_nombre.png')}
                resizeMode='contain'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 12,
    },
    logo: {
        height: 30,
        width: 120,
    }
});

export default Header;