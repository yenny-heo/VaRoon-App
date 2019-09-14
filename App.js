import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Main from './Main.js';

var id, password;
export default class extends React.Component{
  state = {
    login: false
  };

  render(){
  return (
    this.state.login ? <Main></Main> :
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/VaRoon.png')}></Image>
      <TextInput style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="ID"
      placeholderTextColor="#A8BAFA"
      onChangeText={text => id = text}
      ></TextInput>
      <TextInput style={styles.input} 
      secureTextEntry={true}
      underlineColorAndroid="transparent"
      placeholder="PASSWORD"
      placeholderTextColor="#A8BAFA"
      onChangeText={text => password = text}
      ></TextInput>
      <TouchableOpacity style={styles.loginButton} onPressOut={this._loginAuth}>
        <Text style={{color: '#fff'}}>LOGIN</Text>
      </TouchableOpacity>
    </View>
    );
  }
  _loginAuth = () => {
    console.log(id, password);
    //로그인 성공시
    this.setState({login: true});

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
    borderBottomColor: '#999',
    fontSize: 30,
    color: '#5276F6'
  },
  loginButton:{
    marginTop: 60,
    width: 130,
    height: 50,
    backgroundColor: '#5276F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
