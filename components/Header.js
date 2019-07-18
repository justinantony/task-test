import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={{
                    uri:
                        'https://savings-scanner.com/rfn2/img/logo.png',
                }}
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height:50
    },

    logo: {
        width: 225,
        height: 35,
        // borderRadius: 40/2,
        marginLeft: 15,
    }
});


export default Header;