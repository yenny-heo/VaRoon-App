import React from 'react';
import { createAppContainer, } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EyemovementChart from './chart/EyemovementChart';
import StrabismusAngleChart from './chart/StrabusmusAngleChart';
import FocusChart from './chart/FocusChart';
import { AntDesign } from '@expo/vector-icons'

const TabNavigation = createBottomTabNavigator({
    EyeMovement: {
        screen: EyemovementChart,
        navigationOptions: {
            title: "안구운동",
            tabBarIcon: ({tintColor}) => <AntDesign
                name="areachart"
                color= {tintColor}
                size={35}
            ></AntDesign>
        }

    },
    StrabismusAngle: {
        screen: StrabismusAngleChart,
        navigationOptions: {
            title: "사시각",
            tabBarIcon: ({tintColor}) => <AntDesign
                name="dotchart"
                color = {tintColor}
                size={36}
            ></AntDesign>
        }
    },
    Focus: {
        screen: FocusChart,
        navigationOptions: {
            title: "집중도",
            tabBarIcon: ({tintColor}) => <AntDesign
                name="barschart"
                color = {tintColor}
                size={36}
            ></AntDesign>
        }
    },

},
    {
        tabBarOptions: {
            activeTintColor:'#2e2e2e',
            inactiveTintColor:'#828282',
            style:{
                height: 80,
                backgroundColor: "#f5f5f5"
            },
            labelStyle:{
                fontSize: 15,
                marginTop: -20
            }
        },
    }
);

export default createAppContainer(TabNavigation);

