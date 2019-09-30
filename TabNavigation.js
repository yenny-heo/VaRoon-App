import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EyemovementChart from './chart/EyemovementChart';
import StrabismusAngleChart from './chart/StrabusmusAngleChart';
import FocusChart from './chart/FocusChart';

import { Entypo } from '@expo/vector-icons'

const TabNavigation = createBottomTabNavigator({
    Chart1: {
        screen: EyemovementChart,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Entypo
                name="circular-graph"
                color= {tintColor}
                size={38}
            ></Entypo>
        }

    },
    Chart2: {
        screen: StrabismusAngleChart,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Entypo
                name="line-graph"
                color = {tintColor}
                size={36}
            ></Entypo>
        }
    },
    Chart3: {
        screen: FocusChart,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Entypo
                name="bar-graph"
                color = {tintColor}
                size={36}
            ></Entypo>
        }
    },

},
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor:'#3661f7',
            inactiveTintColor:'#c2cffc'

        }
    }
);

export default createAppContainer(TabNavigation);

