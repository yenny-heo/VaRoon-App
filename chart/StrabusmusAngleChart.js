import React from 'react';
import {StyleSheet, View, Text} from 'react-native'

export default class StrabismusAngleChart extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                 <Text style={styles.chartTitle}> Strabismus Angle </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    chartTitle: {
        fontSize: 30,
        color: "#2741a1",
        fontWeight: "300",
        marginTop: 30
    }
})