import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Main from './Main.js';

var id, password;
export default class extends React.Component{
  state = {
    login: true
  };

  render(){
    return (
      this.state.login ? <Main></Main> :
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"></StatusBar>
          <View style={styles.halfContainer1}>
            <Image style={styles.logo} source={require('./assets/VaRoon.png')}></Image>
          </View>
          <View style={styles.halfContainer2}>
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
              <Text style={{ color: '#fff' }}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
  _loginAuth = () => {
    if(id == undefined|| id == "" || password == undefined || password == "")
    {
      Alert.alert("Enter your ID and password")
    }
    else{
      fetch('http://15.164.220.109/Api/Home/Login',{
        method: 'POST',
        headers:{
          'Accept': 'application/hal+json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          id: id,
          pw: password
        }),
      })
      .then(json => {
        if(json.ok)  this.setState({login: true}); //로그인 성공
        else Alert.alert("ID or Password is do not match") //로그인 실패
    })
      .catch(err => console.log(err));

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  halfContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  halfContainer2: {
    flex: 2,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: -100,
    resizeMode: 'contain'

  },
  input:{
    marginTop: 10,
    height: 50,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    fontSize: 30,
    color: '#5276F6'
  },
  loginButton:{
    marginTop: 50,
    width: 300,
    height: 50,
    backgroundColor: '#698aff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
