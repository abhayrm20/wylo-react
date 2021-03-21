import HomeScreen from './screens/HomeScreen';
import SelectPostTypeScreen from './screens/SelectPostType';
import TextPostScreen from './screens/TextPost';
import ImagePostScreen from './screens/ImagePost';
import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Wylo Demo',
            },
        },
        SelectPostTypeScreen: {
            screen: SelectPostTypeScreen,
            navigationOptions: {
                title: 'Select Post Type',
            },
        },
        TextPostScreen: {
            screen: TextPostScreen,
            navigationOptions: {
                title: 'Text',
            },
        },
        ImagePostScreen: {
            screen: ImagePostScreen,
            navigationOptions: {
                title: 'Image',
            },
        },
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTitleStyle: {
                color: '#000',
            },
            headerBackTitleStyle: {
                color: '#000',
            }
        },
    }
);

const AppContainer = createAppContainer(MainNavigator);
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <AppContainer />;
    }
}
