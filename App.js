import React, { useState } from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { ISSUER } from 'react-native-dotenv';
import config from './oktaConfig';

//configure as web platform to allow for Okta redirects
if (Platform.OS === "web") {
  WebBrowser.maybeCompleteAuthSession();
}
const useProxy = true;

export default function App() {

  const discovery = AuthSession.useAutoDiscovery(ISSUER);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    config,
    discovery
  );

  //Get Token
  // const removeToken = async () => {
  //   return await AsyncStorage.removeItem("access_token");
  // };
  const getToken = async () => {
    return await AsyncStorage.getItem("access_token");
  };

  const handleLogin = () => {
    console.log("loggin in...");
    getToken()
      .then(async (token) => {
        console.log("Got Token:", token);
        if (token !== null) {
          //Check if token is valid
          //Ping Backend to validate token

          console.log('success')
          //Navigates to Families Screen
          //props.navigation.replace("Families");
        } else {
          //Gets New Token
          console.log('config', config)
          await promptAsync({ useProxy }).then((res) => {
            AsyncStorage.setItem("access_token", res.params.access_token);
            //navigates to families screen
            //props.navigation.replace("Families");
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Button title='login' onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
