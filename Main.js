import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform,ScrollView} from 'react-native';

const {width, height} = Dimensions.get("window");

export default class Main extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Text style={styles.title}>Chart</Text>
                <ScrollView style={styles.chart}>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#5276F6',
        alignItems: 'center'
    },
    title:{
        color: 'white',
        fontSize: 40,
        marginTop: 50,
        fontWeight: "200",
        marginBottom: 20
    },
    chart:{
        backgroundColor: "white",
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50,50,50)",
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset:{
                    height: -2,
                    width: 0
                }

            },
            android: {
                elevation: 10
            }
        })
    }
})