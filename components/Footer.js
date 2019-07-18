import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            <Image
                source={{
                    uri:
                        'https://savings-scanner.com/rfn2/img/SecureSeal.png',
                }}
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    logo: {
        width: 120,
        height:120
    }
});


export default Footer;