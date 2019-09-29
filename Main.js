import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform,ScrollView} from 'react-native';
import EyemovementChart from './EyemovementChart';

const {width, height} = Dimensions.get("window");

export default class Main extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.navBar}>
                    <Text style={styles.title}>Chart</Text>
                </View>
                <View style={styles.chart}>
                    <EyemovementChart></EyemovementChart>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    navBar:{
        height: 100,
        width: width,
        backgroundColor: '#5276F6',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50,50,50)",
                shadowOpacity: 1,
                shadowOffset:{
                    height: 5,
                    width: 0
                }

            },
            android: {
                elevation: 10
            }
        })
        
    },
    title:{
        flex: 1,
        color: 'white',
        fontSize: 40,
        marginTop: 40,
        fontWeight: "200",
        marginBottom: 10,
        
    },
    chart:{
        backgroundColor: "white",
        flex: 10,
        width: width
        
    }
})