import React from "react";
import {Text, View, StyleSheet, Image, ToastAndroid, Linking, Alert, Button, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class SelectPostTypeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            booking: true,
        };
    }

    _onImageButtonPress = () => {
        console.log('Image Button pressed');
        launchImageLibrary({
            title: 'Choose an image for your post',
            mediaType: 'photo',
        }, async (response) => {
            if(response.uri) {
                console.log(response.uri);
                await AsyncStorage.setItem("imageWidth", `${response.width}`);
                await AsyncStorage.setItem("imageHeight", `${response.height}`);
                // await AsyncStorage.setItem("imageBase64", response.base64);
                await AsyncStorage.setItem("imageURI", response.uri).then(() => {
                    this.props.navigation.navigate("ImagePostScreen");
                });

            }
            else {
                console.log(`Error with image: ${response.errorCode} | ${response.errorMessage}`);
                Alert.alert(`Error ${response.errorCode}`, response.errorMessage);
            }
        })
    }

    _onTextButtonPress = () => {
        console.log('Text Button pressed');
        this.props.navigation.navigate("TextPostScreen");
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this._onImageButtonPress}
                >
                    <Text>Image</Text>

                </TouchableOpacity>

                <View style={{height: 50}}></View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this._onTextButtonPress}
                >
                    <Text>Text</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

export default SelectPostTypeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        width: 100,
        height: 50,
        backgroundColor: '#DEDEDE',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
