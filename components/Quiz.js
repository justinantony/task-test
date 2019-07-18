import React, {useState} from 'react';
import {ProgressBarAndroid, TouchableOpacity, StyleSheet, View, Text} from 'react-native';

const quizStore = [
    {h: 'LOWER RATES FOR ALL TYPES OF HOMES ARE AVAILABLE', q: 'Great! What type of property?', a: ['Single Family', 'Coop', 'Condominium', 'Manufactured','Mobile Home','Townhouse']},
    {h: 'THERE AMAZING PROGRAMS AVAILABLE FOR MOST CREDIT SCORES', q: 'How is Your Credit?', a: ['Excellent', 'Fair', 'Good', 'Poor']},
]

const QuizItem = ({currentquiz, handleOnPress}) => {
    return (
        <View>
            <Text style={styles.quizheader}>{currentquiz.h}</Text>
            <View style={styles.progressBarContainer}>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={0.5}
                />
            </View>
            <Text style={styles.quiztitle}>{currentquiz.q}</Text>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'center'
            }}>
                { currentquiz.a.map(ans => {
                    return <TouchableOpacity
                        key={ans}
                        style={styles.button}
                        onPress={handleOnPress}
                    >
                        <Text style={styles.text}>{ans}</Text>
                    </TouchableOpacity>
                }) }
            </View>
        </View>
    )
}


const Quiz = () => {

    const handleOnPress = () => {
        setQuiz(quiz+1);
    }

    return (
        <View style={styles.container}>
            <QuizItem handleOnPress={handleOnPress} currentquiz={quizStore[quiz]}/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 0,
    },

    progressbarcontainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#fa6900',
        padding: 10,
        margin: 5,
        width: '45%',
        elevation: 2
    },

    quizheader: {
        textAlign:'center',
        padding: 10,
        fontSize: 15
    },

    quiztitle: {
        textAlign:'center',
        padding: 10
    },


    text: {
        color: '#ffffff'
    }
});


export default Quiz;