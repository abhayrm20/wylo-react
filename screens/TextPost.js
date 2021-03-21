import React from "react";
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    TextInput
} from "react-native";
import axios from "axios";
import {url} from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';

class TextPostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postText: "",
            isPosting: false,
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: () =>
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('submitPost')();
                    }}
                    style={{
                        backgroundColor: "#DEDEDE",
                        marginVertical: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 9,
                        marginRight: 5,
                    }}
                >
                    <Text style={{
                        marginHorizontal: 10,
                    }}>POST</Text>
                </TouchableOpacity>
        }
    }

    submitPost = () => {
        if (this.state.postText.length > 0) {
            console.log('Adding text post: ')
            console.log(this.state.postText);
            this.setState({
                isPosting: true,
            });
            let data = new FormData();
            data.append('postText', this.state.postText);

            axios.post(url + 'posts/add', data).then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    this.setState({
                        isPosting: false,
                    });
                    ToastAndroid.show('Post added successfully!', ToastAndroid.SHORT);
                    this.props.navigation.pop(2)
                } else {
                    this.setState({
                        isPosting: false,
                    });
                    Alert.alert("Error " + response.data.code, response.data.message);
                }
            })
        } else {
            console.log('Text is blank');
            Alert.alert('Error', 'Please input some text. Post can\'t be blank!');
        }
    }

    componentDidMount() {
        const {navigation} = this.props
        navigation.setParams({
            submitPost: this.submitPost,
        })
    }

    render() {
        if (this.state.isPosting) return (
            <View style={styles.container}>
                <Spinner
                    visible={true}
                    textContent={'Posting...'}
                    // textStyle={styles.spinnerTextStyle}
                />
            </View>
        )
        else return (
            <View style={styles.container}>

                <TextInput
                    style={styles.textInput}
                    placeholder={"Write content here"}
                    onChangeText={text => {
                        this.setState({postText: text});
                        this.props.navigation.setParams({postText: text});
                    }}
                    multiline={true}
                />
            </View>
        );
    }
}

export default TextPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    box10: {
        height: 10,
        backgroundColor: "#DEDEDE",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DEDEDE",
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 60,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 30,
        borderRadius: 50,
        borderColor: "#000",
        borderWidth: 1,
        width: 43,
        textAlign: 'center',
    },

    textInput: {
        margin: 10,
    }

});
