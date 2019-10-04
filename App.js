import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import axios from 'axios';
import Main from './Main.js';

var id, password;
export default class extends React.Component {
  state = {
    login: false,
    token: '',
    name: ''
  };

  render() {
    return (
      this.state.login ? <Main data={this.state.data}></Main> :
        <View style={styles.container}>
          <StatusBar barStyle="dark-content"></StatusBar>
          <View style={styles.halfContainer1}>
            <Image style={styles.logo} source={require('./assets/logo_column.png')}></Image>
          </View>
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text style={styles.id}>ID</Text>
          </View>
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="영문 소문자, 숫자 조합, 6-13자"
            placeholderTextColor="#c2c2c2"
            onChangeText={text => id = text}
          ></TextInput>
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text style={styles.pw}>Password</Text>
          </View>
          <TextInput style={styles.input}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            placeholder="영문, 숫자, 특수 문자 조합, 8-12자 내외"
            placeholderTextColor="#c2c2c2"
            onChangeText={text => password = text}
          ></TextInput>
          <TouchableOpacity style={styles.loginButton} onPressOut={this._loginAuth}>
            <Text style={{ color: '#fff', fontWeight:'500', fontSize:19 }}>로그인</Text>
          </TouchableOpacity>
        </View>
    );
  }
  _loginAuth = () => {
    if (id == undefined || id == "" || password == undefined || password == "") {
      Alert.alert("Enter your ID and password")
    }
    else {
      axios({
        method: 'post',
        url: 'http://15.164.220.109/Api/Home/Login',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          id: id,
          pw: password
        }
      })
        .then(json => {
          if (json.status == 200) {
            this.setState({ login: true, data: json.data });
          }
        })
        .catch(err => { Alert.alert("ID or Password does not match") });
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
    marginTop: 85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 140,
    height: 100,
    resizeMode: 'contain'

  },
  id: {
    fontSize: 20,
    marginTop: 40,
    ...Platform.select({
      ios: {
        marginLeft: 54
      },
      android: {
        marginLeft: 30
      }
  })
  },
  pw: {
    fontSize: 20,
    marginTop: 24,
    ...Platform.select({
      ios: {
        marginLeft: 54
      },
      android: {
        marginLeft: 30
      }
  })
  },
  input: {
    marginTop: 11,
    height: 52,
    width: 300,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 3,
    fontSize: 16,
    color: '#5276F6'
  },
  loginButton: {
    marginTop: 50,
    width: 300,
    height: 55,
    backgroundColor: '#4b74ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    ...Platform.select({
      ios: {
          shadowColor: "rgba(75, 116, 255, 0.6)",
          shadowOpacity: 1,
          shadowOffset:{
              width: 0,
              height: 3
          },
          shadowRadius: 10,

      },
      android: {
          elevation: 10
      }
  })
  }
});
