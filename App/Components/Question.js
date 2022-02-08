import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


export const QuestionButton = props => (
  <TouchableOpacity
    key={props.id}
    style={[styles.question, props.style]}
    onPress={props.navigationAction}
  >
    <Text style={styles.loginText}>{props.name}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  button: {
    flex: 1,
    //justifyContent: "space-around",
    alignItems: "center",
    //borderWidth: 1,
    borderRadius: 7
    //backgroundColor: 'white'
  },
  question: {
    elevation: 2, // Android
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "12%",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#46b4f0",
    marginTop: 20,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  loginText: {
    color: "black",
    textAlign: "center",
    paddingLeft: 10,
    fontSize: 16,
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 1
  }
});
