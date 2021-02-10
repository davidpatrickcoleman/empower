import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { FrequentlyAskedQuestions } from "../../Constants/Constants";

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 7 }}>
        <Card containerStyle={styles.card}>
          <Card.Title>
            {" "}
            <Text style={styles.question}>
              {FrequentlyAskedQuestions.rows[0].question}
            </Text>
          </Card.Title>
          <Card.Divider />

          <Text style={styles.answer}>
            {FrequentlyAskedQuestions.rows[0].answer}
          </Text>
        </Card>
      </View>
      <View style={{ flex: "1", alignItems: "center" }}></View>
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
