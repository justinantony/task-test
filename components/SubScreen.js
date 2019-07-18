import React, {useState, useEffect} from 'react';
import {ProgressBarAndroid, TouchableOpacity, FlatList, StyleSheet, View, Text, TextInput, Slider} from 'react-native';

import Validate from './Validate'

const dataStore = [
    {
        h: 'LOWER RATES FOR ALL TYPES OF HOMES ARE AVAILABLE',
        s: '',
        q: 'Great! What type of property?',
        a: ['Single Family', 'Coop', 'Condominium', 'Manufactured', 'Mobile Home', 'Townhouse']
    },
    {
        h: 'THERE AMAZING PROGRAMS AVAILABLE FOR MOST CREDIT SCORES',
        s: '',
        q: 'How is Your Credit?',
        a: ['Excellent', 'Fair', 'Good', 'Poor']
    },
    {h: 'NOW LETS ANALYZE THE PROGRAMS AVAILABLE FOR YOUR PROPERTY', s: 3, q: 'Enter Your Street Address', a: []},
    {h: 'ABOUT HOW MUCH DO YOU THINK YOU WOULD LIKE TO BORROW', s: 4, q: 'Please select the amount', a: []},
    {h: 'TELL US HOW MUCH YOU “THINK” YOUR HOME IS WORTH', s: 4, q: 'Estimated property value', a: []},
    {h: 'ABOUT HOW MUCH DO YOU THINK YOU WOULD LIKE TO BORROW', s: 4, q: 'Please select current interest rate', a: []},
    {
        h: 'YOUR PERSONAL REPORT IS ALMOST READY TO SEND',
        s: 4,
        q: 'Please Fill Out Information Below so You Can Receive Your Results',
        a: []
    },

    {
        h: 'Congratulations, You Will Be Contacted Shortly For Your Free Quote',
        s: 4,
        q: 'During your free evaluation you may need a Fresh Copy of your Credit Report.',
        a: []
    }
]

const SearchList = ({data, setPostCode, setState, setFlatdata}) => {
    const getPostCode = async (id) => {
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyDBW0Kkx56k2XB77scLn2NDl4mICvuNAeA'
        var result = await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        const postcode = result.result.address_components.map(r => {
            return r.types.map(t => {
                if (t === "postal_code") {
                    setState(result.result.formatted_address);
                    setFlatdata([])
                }
                setPostCode(t === "postal_code" ? r.short_name : '')
            });
        });
    }

    return (<View style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }}>
        <FlatList
            data={data}
            renderItem={({item}) =>
                <TouchableOpacity
                    onPress={() => getPostCode(item.key)}
                >
                    <Text key={item.key} style={styles.item}>{item.address}</Text>
                </TouchableOpacity>
            }
        />
    </View>)
}

const Screen3 = ({data, creditData, next}) => {
    console.log(creditData)
    //Address Screen
    const [state, setState] = useState('')
    const [flatdata, setFlatdata] = useState([])
    const [postCode, setPostCode] = useState('')
    const [msg, setMsg] = useState('')

    const handleChangeText = async (text) => {
        setState(text)
        const url = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=AIzaSyDBW0Kkx56k2XB77scLn2NDl4mICvuNAeA&input=' + text
        var result = await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        setFlatdata(result.predictions.map(r => {
            return {key: r.place_id, address: r.description}
        }));
    }

    const handleClickNext = () => {
        if (postCode !== "" && postCode !== '-') {
            creditData.push(state)
            creditData.push(postCode)
            next()
        } else {
            setMsg('Please provide your street number at the beginning')
        }
    }

    const validateInput = () => {
        return msg === '' ? styles.searchInput : styles.searchInputError;
    }

    return (<View>
        <Text style={styles.title}>{data.q}</Text>
        <TextInput
            placeholder="Type here to get address!"
            style={validateInput()}
            onChangeText={handleChangeText}
            value={state}
        />
        {flatdata.length > 0 &&
        <SearchList data={flatdata} setState={setState} setFlatdata={setFlatdata} setPostCode={setPostCode}/>}
        {postCode === "" && msg !== '' && <Text style={styles.errorText}>{msg}</Text>}
        {postCode === "" && <TextInput
            placeholder="Post Code"
            style={styles.textInput}
            value={postCode}
            onChangeText={(text) => {
                setPostCode(text)
            }}
            maxLength={5}
        />}
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center'
        }}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleClickNext}
            >
                <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>)
}

const Screen5 = ({data, creditData, next}) => {
    //property worth screen
    const step = 1
    const [val, setVal] = useState(6)
    const maxAmt = [2000000 * (val / 100)]
    const minAmt = [2000000 * (((val - 1) / 2) / 100)]

    return <View>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignItems: 'flex-start',

        }}>
            <Text style={styles.title}>{data.q}</Text>

            <View style={{
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 20
            }}>
                <Text style={{fontSize: 18}}>{'$' + minAmt + ' to $' + maxAmt}</Text>
                <Slider
                    style={{width: '100%', height: 30}}
                    minimumValue={1}
                    maximumValue={100}
                    step={step}
                    value={val}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="green"
                    onValueChange={(value) => {
                        setVal(value);
                    }}

                />
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={next}
            >
                <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const Screen4 = ({data, creditData, next}) => {
    console.log(creditData)
    //estimate screen
    const step = 1
    const minRange = [
        {minAmt: 0, maxAmt: 59000},
        {minAmt: 60000, maxAmt: 69000},
        {minAmt: 70000, maxAmt: 79000},
        {minAmt: 80000, maxAmt: 100000},
        {minAmt: 100000, maxAmt: 150000},
        {minAmt: 150000, maxAmt: 200000},
        {minAmt: 200000, maxAmt: 250000},
        {minAmt: 250000, maxAmt: 300000},
        {minAmt: 300000, maxAmt: 350000},
        {minAmt: 350000, maxAmt: 400000},
        {minAmt: 400000, maxAmt: 450000},
        {minAmt: 450000, maxAmt: 500000},
        {minAmt: 500000, maxAmt: 550000},
        {minAmt: 550000, maxAmt: 600000},
        {minAmt: 600000, maxAmt: 650000},
        {minAmt: 650000, maxAmt: 700000},
        {minAmt: 700000, maxAmt: 750000},
    ]
    const [val, setVal] = useState(6)
    const amtTxt = () => {
        const minAmt = minRange[val]['minAmt']
        const maxAmt = minRange[val]['maxAmt']
        return '$' + minAmt + ' to $' + maxAmt
    }

    return <View>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',

        }}>
            <Text style={styles.title}>{data.q}</Text>

            <View style={{
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 20
            }}>
                <Text style={{fontSize: 18}}>{amtTxt()}</Text>
                <Slider
                    style={{width: '100%', height: 30}}
                    minimumValue={0}
                    maximumValue={16}
                    step={step}
                    value={val}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="green"
                    onValueChange={(value) => {
                        setVal(value);
                    }}

                />
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        creditData.push(amtTxt())
                        next()
                    }}
                >
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const Screen6 = ({data, creditData, next}) => {
    console.log(creditData);
    //percentage Screen
    const step = 1
    const [val, setVal] = useState(10)
    return <View>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',

        }}>
            <Text style={styles.title}>{data.q}</Text>

            <View style={{
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 20
            }}>
                <Text style={{fontSize: 18}}>{val + '%'}</Text>
                <Slider
                    style={{width: '100%', height: 30}}
                    minimumValue={1}
                    maximumValue={30}
                    step={step}
                    value={val}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="green"
                    onValueChange={(value) => {
                        setVal(value);
                    }}

                />
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        creditData.push(val)
                        next()
                    }}
                >
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const Screen7 = ({data, creditData, next}) => {
    console.log(creditData);
    const address = creditData[2];
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [edited, setEdited] = useState({});

    /*
        const [handleSubmit, handleChange, values, errors] = useForm(() => {
            console.log('Form Submitted')
        });
    */

    useEffect(() => {
        setErrors(Validate(values));
    }, [values])


    const handleOnPress = () => {
        if (errors.length) {
            return false;
        }
        creditData.push(values)
        next()
    }



    return <View>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',

        }}>
            <Text style={styles.title}>{data.q}</Text>
        </View>
        <View style={{
            flex: 6,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',

        }}>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'center',
                margin: 10

            }}>
                <TextInput
                    placeholder="First Name"
                    autoCompleteType={'off'}
                    style={{
                        width: '100%',
                        padding: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        height: 40,
                        lineHeight: 35,
                        margin: 5
                    }}
                    maxLength={100}
                    value={values.firstname || ''}
                    onChangeText={(text) => {
                        setValues({...values, firstname: text})
                        setEdited({...edited, firstname: true})
                    }}
                />
                {errors.firstname && edited.firstname === true &&
                <Text style={styles.errorText}>{errors.firstname}</Text>}
                <TextInput
                    placeholder="Last Name"
                    style={{
                        width: '100%',
                        padding: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        height: 40,
                        lineHeight: 35,
                        margin: 5
                    }}
                    value={values.lastname || ''}
                    onChangeText={(text) => {
                        setValues({...values, lastname: text})
                        setEdited({...edited, lastname: true})
                    }}
                    maxLength={100}
                />
                {errors.lastname && edited.lastname === true && <Text style={styles.errorText}>{errors.lastname}</Text>}
                <TextInput
                    placeholder="Email Address"
                    style={{
                        width: '100%',
                        padding: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        height: 40,
                        lineHeight: 35,
                        margin: 5
                    }}
                    maxLength={100}
                    onChangeText={(text) => {
                        setValues({...values, email: text})
                        setEdited({...edited, email: true})
                    }}
                    value={values.email || ''}
                />
                {errors.email && edited.email === true && <Text style={styles.errorText}>{errors.email}</Text>}
                <TextInput
                    placeholder="Phone Number with Area Code"
                    style={{
                        width: '100%',
                        padding: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        height: 40,
                        lineHeight: 35,
                        margin: 5
                    }}
                    value={values.phone || ''}
                    onChangeText={(text) => {
                        setValues({...values, phone: text})
                        setEdited({...edited, phone: true})
                    }}

                />
                {errors.phone && edited.phone === true && <Text style={styles.errorText}>{errors.phone}</Text>}


                <TextInput
                    placeholder="Street Address"
                    style={{
                        width: '100%',
                        padding: 5,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        height: 40,
                        lineHeight: 35,
                        margin: 5,
                        textAlign: 'center',
                    }}
                    defaultValue={address}
                    editable={false}

                />

                <TouchableOpacity
                    style={styles.getResultButton}
                    onPress={handleOnPress}
                    disabled={errors.length ? true : false}
                >
                    <Text style={styles.text}>Get Result</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const Screen8 = ({creditData}) => {
    console.log(creditData)
    return <View style={{flex: 6}}><Text style={{textAlign: 'center'}}>To download your credit please click here
        now.</Text></View>
}

const Quiz = ({data, creditData, next}) => {
    return (<View>
        <Text style={styles.title}>{data.q}</Text>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center'
        }}>
            {data.a.map(ans => {
                return <TouchableOpacity
                    key={ans}
                    style={styles.button}
                    onPress={() => {
                        creditData.push(ans);
                        next()
                    }}
                >
                    <Text style={styles.text}>{ans}</Text>
                </TouchableOpacity>
            })}
        </View>
    </View>)
}

const SubScreen = ({screen, next, creditData, setCreditData}) => {
    const data = dataStore[screen];
    const progress = (screen + 1) / 8;
    const screen1 = <Quiz data={data} creditData={creditData} next={next}/> //Quiz Screens
    const screen2 = <Screen3 data={data} creditData={creditData} next={next}/> //Address Screen
    const screen3 = <Screen4 data={data} creditData={creditData} next={next}/> //Barrow Screen
    const screen4 = <Screen5 data={data} creditData={creditData} next={next}/> //Property Value Screen
    const screen5 = <Screen6 data={data} creditData={creditData} next={next}/> //Interest Rate Screen
    const screen6 = <Screen7 data={data} creditData={creditData} next={next}/> //Get Result Screen
    const screen7 = <Screen8 data={data} creditData={creditData} next={next}/> //Final Screen

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{data.h}</Text>
            <View style={styles.progressBarContainer}>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={progress}
                />
            </View>
            {screen < 2 && screen1}
            {screen == 2 && screen2}
            {screen == 3 && screen3}
            {screen == 4 && screen4}
            {screen == 5 && screen5}
            {screen == 6 && screen6}
            {screen == 7 && screen7}


            {/*{screen && screen < 2 && <Quiz data={data} next={next}/>}*/}
            {/*{screen && screen == 2 && <Screen3/>}*/}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 0,
        marginTop: 10
    },

    progressBarContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 15,
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#fa6900',
        padding: 10,
        margin: 5,
        width: '40%',
        margin: 10
    },

    nextButton: {
        alignItems: 'center',
        backgroundColor: '#fa6900',
        padding: 10,
        width: '50%',
        marginTop: 40
    },

    getResultButton: {
        alignItems: 'center',
        backgroundColor: '#fa6900',
        padding: 20,
        width: '80%',
        marginTop: 40,
        borderRadius: 24
    },

    header: {
        textAlign: 'center',
        padding: 10,
        fontSize: 15,
        marginTop: 10,
        marginBottom: 20,
    },

    title: {
        textAlign: 'center',
        padding: 10,
        marginTop: 20,
    },

    text: {
        color: '#ffffff'
    },

    item: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 40,
        padding: 1,
        lineHeight: 40
    },
    searchInput: {
        height: 40,
        borderRadius: 5,
        paddingStart: 5,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2,
        textAlign: 'center'
    },

    searchInputError: {
        height: 40,
        borderRadius: 5,
        paddingStart: 5,
        borderColor: 'red',
        borderWidth: 1,
        padding: 2,
        textAlign: 'center'
    },

    textInput: {
        height: 40,
        borderRadius: 5,
        paddingStart: 5,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2,
        marginTop: 10,
        textAlign: 'center'
    },

    textInputError: {
        height: 40,
        borderRadius: 5,
        paddingStart: 5,
        borderColor: 'red',
        borderWidth: 1,
        padding: 2,
        marginTop: 10
    },

    errorText: {
        color: 'red',
        fontSize: 12
    }

});


export default SubScreen;