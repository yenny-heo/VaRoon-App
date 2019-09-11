import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default class extends React.Component{
  render(){
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/VaRoon.png')}></Image>
      <TextInput style={styles.input} 
      underlineColorAndroid="transparent"
      placeholder="ID"
      placeholderTextColor="#A8BAFA"
      ></TextInput>
      <TextInput style={styles.input} 
      secureTextEntry={true}
      underlineColorAndroid="transparent"
      placeholder="PASSWORD"
      placeholderTextColor="#A8BAFA"
      ></TextInput>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={{color: '#fff'}}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    marginTop: 150,
    marginBottom:  50,
    width: 200,
    height: 200,
    resizeMode: 'contain'

  },
  input:{
    marginTop: 30,
    height: 50,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#2e2e2e',
    fontSize: 30,
    color: '#5276F6'
  },
  loginButton:{
    marginTop: 60,
    width: 100,
    height: 50,
    backgroundColor: '#5276F6',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
