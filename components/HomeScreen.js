import React, {useState, useEffect} from 'react';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import Header from './Header'
import Footer from './Footer'
import SubScreen from "./SubScreen";


const HomeScreen = () => {
    const [creditData, setCreditData] = useState([])
    const [screen, setScreen] = useState(0)


    const sendNotificationImmediately = async () => {
        const id = await Notifications.presentLocalNotificationAsync({
            title: 'Expo Task',
            body: 'This is a push Notification from Expo React Native App',
        });
        alert('Push Notification with ID ' + id + ' Sent!');
    };

    const nextScreen = () => {
        setScreen(screen + 1)
    }

    const PushNotifications = ({state}) => {
        return <View>
            <TouchableOpacity onPress={() => sendNotificationImmediately()} style={styles.button}>
                <Text style={styles.text}>Send me a push notification!</Text>
            </TouchableOpacity>
        </View>
    }


    return (
        <View style={styles.ScreenContainer}>
            <PushNotifications/>
            <SubScreen screen={screen} creditData={creditData} setCreditData={setCreditData} next={nextScreen}/>
            <Footer/>
        </View>
    );
}


HomeScreen.navigationOptions = ({navigation}) => ({
    //To set the header image and title for the current Screen
    //title: 'Main',
    //Title
    headerLeft: <Header/>,
    //Image in Navigation Bar

    headerStyle: {
        backgroundColor: '#e3e3e3',
        //Background Color of Navigation Bar
    },

    headerTintColor: '#606070',
    //Text Color of Navigation Bar
});

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#fa6900',
        padding: 10,
        margin: 5,
        width: '80%',
        margin: 10,
    },

    text: {
        color: '#ffffff'
    },
});

export default HomeScreen;