import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer, } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EyemovementChart from './chart/EyemovementChart';
import StrabismusAngleChart from './chart/StrabusmusAngleChart';
import FocusChart from './chart/FocusChart';

const TabNavigation = createBottomTabNavigator({
    EyeMovement: {
        screen: EyemovementChart,
        navigationOptions: {
            title: "안구운동",
            tabBarIcon: ({focused}) => {
                const image = focused 
                ? require('./assets/chart1Active.png')
                : require('./assets/chart1Inactive.png')
                return <Image 
                source={image}
                style={styles.image1}></Image>
            }
        }

    },
    StrabismusAngle: {
        screen: StrabismusAngleChart,
        navigationOptions: {
            title: "사시각",
            tabBarIcon: ({focused}) => {
                const image = focused 
                ? require('./assets/chart2Active.png')
                : require('./assets/chart2Inactive.png')
                return <Image 
                source={image}
                style={styles.image2}></Image>
            }
        }
    },
    Focus: {
        screen: FocusChart,
        navigationOptions: {
            title: "집중도",
            tabBarIcon: ({focused}) => {
                const image = focused 
                ? require('./assets/chart3Active.png')
                : require('./assets/chart3Inactive.png')
                return <Image 
                source={image}
                style={styles.image2}></Image>
            }
        }
    },

},
    {
        tabBarOptions: {
            activeTintColor:'#4b74ff',
            inactiveTintColor:'#a6a6a6',
            style:{
                height: 80,
                backgroundColor: "#fcfcfc"
            },
            labelStyle:{
                fontSize: 13,
                marginBottom: 25,
                marginTop: -15
            }
        },
    }
);

const styles = StyleSheet.create({
    image1: {
        height: 20,
        width: 23,
        resizeMode: 'contain'
    },
    image2: {
        height: 20,
        width: 30,
        resizeMode: 'contain'
    },
})

export default createAppContainer(TabNavigation);

