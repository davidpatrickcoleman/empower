import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import { FrequentlyAskedQuestions } from "../../Constants/Constants";

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <>
          <Card containerStyle={styles.card}>
            <Card.Title>
              {" "}
              <Text style={styles.question}>
                {FrequentlyAskedQuestions.rows[2].question}
              </Text>
            </Card.Title>
            <Card.Divider />

            <Text style={styles.answer}>
              {FrequentlyAskedQuestions.rows[2].answer}
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
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30,
    marginBottom: 30
  },
  answer: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5
  }
});
