import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity
} from "react-native";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import {url} from "../constants";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            booking: true,
            isLoading: true,
            posts: [],
            noPosts: false,
        };
    }

    componentDidMount() {
        this.fetchPosts();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.fetchPosts();
            }
        );


    }

    fetchPosts = () => {
        axios.get(url + 'posts').then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                console.log(response.data)
                if (response.data.posts.length > 0) {
                    this.setState({
                        posts: response.data.posts,
                        isLoading: false,
                    });
                } else {
                    console.log("No posts available")
                    console.log(response.data);
                    this.setState({
                        noPosts: true,
                        isLoading: false,
                    });
                }

            } else {
                this.setState({
                    noPosts: true,
                    isLoading: false,
                });
                console.log(response);
                Alert.alert("Error " + response.data.code, response.data.message);
            }
        })
    }

    _onButtonPress = () => {
        console.log('Button pressed');
        this.props.navigation.navigate("SelectPostTypeScreen");
    }

    render() {
        if (this.state.isLoading) return (
            <View style={styles.container}>
                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                />
            </View>
        )
        else if (this.state.noPosts) return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column'}}>

                <Text style={{fontWeight: 'bold', fontSize: 24}}>No posts available!</Text>
                <Text>Add a new post using the button below or check back later.</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this._onButtonPress}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>


            </View>
        )

        else return (
            <View style={styles.container}>
                {this.state.posts.map((post, i) => (
                        <View>
                            {post.hasImage
                                ? <Image
                                    style={{marginTop: 5, width: "100%", height: 250}}
                                    source={{uri: url + post.image}}
                                />
                                : <View></View>
                            }
                            <Text style={{padding: 15, textAlign: 'left'}}>
                                {post.text}
                            </Text>
                            <View style={styles.box10}/>
                        </View>
                    )
                )
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={this._onButtonPress}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>


            </View>
        );

    }

}

export default HomeScreen;

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

});
