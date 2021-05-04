import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export const HomeScreenButton = props =>  {
  return ( <TouchableOpacity
    style={[styles.loginScreenButton, props.style]}
    onPress={props.navigationAction}
  >
    <Image
      key={props.name}
      style={{width: '90%', height: 100}}
      resizeMode={'contain'}
      source={props.source}
    />
  </TouchableOpacity>
)};

// Defining prop types for this component

const styles = StyleSheet.create({
  button: {
    flex: 1,
    //justifyContent: "space-around",
    alignItems: "center",
    //borderWidth: 1,
    borderRadius: 7
    //backgroundColor: 'white'
  },
  loginScreenButton: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "80%",
    backgroundColor: "#33BBFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff"
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,

    fontSize: 36,
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 1
  }
});
