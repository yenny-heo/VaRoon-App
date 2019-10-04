import React from 'react';
import { StyleSheet, Image, View, StatusBar, Dimensions, Platform } from 'react-native';
import TabNavigation from './TabNavigation';

const {width} = Dimensions.get("window");

export default class Main extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"></StatusBar>
                <View style={styles.navBar}>
                    <Image style={styles.logo} source={require('./assets/logo_row.png')}></Image>
                </View>
                <View style={styles.chart}>
                    <TabNavigation screenProps = {{data: this.props.data}}></TabNavigation>
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
        height: 90,
        width: width,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c2c2c2'
    },
    logo: {
        width: 130,
        height: 60,
        marginTop:30,
        resizeMode: 'contain'
      },
    chart:{
        backgroundColor: "white",
        flex: 10,
        width: width
        
    }
})