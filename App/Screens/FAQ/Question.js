import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import { Card } from "react-native-elements";
import { FrequentlyAskedQuestions } from "../../Constants/Constants";

export default ({ route, navigation }) => {
  const { frequentlyAsked } = route.params;

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <>
        <Card containerStyle={styles.card}>
          <Card.Title>
            {" "}
            <Text style={styles.question}>
              {frequentlyAsked.question}
            </Text>
          </Card.Title>
          <Card.Divider />

          <Text style={styles.answer}>
            {frequentlyAsked.answer}
          </Text>
        </Card>
          </>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 25,
    backgroundColor: "white"
  },
  question: {
    fontSize: 24,
    color: "#0043f9",
    fontWeight: "bold"
  },
  answer: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5
  }
});
