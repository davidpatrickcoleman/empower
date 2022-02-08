import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { QuestionButton } from "../..//Components/Question";
import { FrequentlyAskedQuestions } from "../../Constants/Constants";
let width = Dimensions.get("window").width;
const destinations = [
  { id: 1, img: require("..//..//..//Picture1.png") },
  { id: 2, img: require("..//..//..//Picture2.png") },
  { id: 3, img: require("..//..//..//Picture3.png") },
  { id: 4, img: require("..//..//..//Picture4.png") },
  { id: 5, img: require("..//..//..//Picture5.png") },
  { id: 6, img: require("..//..//..//Picture6.png") }
];
export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        buttonStyle={{
          marginTop: 10,
          fontSize: 20,
          alignItems: "stretch",
          textAlignVertical: "center",
          paddingLeft: 40,
          paddingRight: 40
        }}
        onPress={() => navigation.navigate("HelpVideos")}
        title="Instruction Videos"
        backgroundColor="#46b4f0"
      ></Button>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
          <QuestionButton
            name={FrequentlyAskedQuestions.rows[1].question}
            navigationAction={() => navigation.navigate("Question", { frequentlyAsked: FrequentlyAskedQuestions.rows[1] })}
          ></QuestionButton>
          <QuestionButton
            name={FrequentlyAskedQuestions.rows[2].question}
            navigationAction={() => navigation.navigate("Question", { frequentlyAsked: FrequentlyAskedQuestions.rows[2] })}
          ></QuestionButton>
          <QuestionButton
            name={FrequentlyAskedQuestions.rows[3].question}
            navigationAction={() => navigation.navigate("Question", { frequentlyAsked: FrequentlyAskedQuestions.rows[3] })}
          ></QuestionButton>
          <QuestionButton
            name={FrequentlyAskedQuestions.rows[4].question}
            navigationAction={() => navigation.navigate("Question", { frequentlyAsked: FrequentlyAskedQuestions.rows[4] })}
          ></QuestionButton>
          <QuestionButton
            name={FrequentlyAskedQuestions.rows[5].question}
            navigationAction={() => navigation.navigate("Question", { frequentlyAsked: FrequentlyAskedQuestions.rows[5] })}
          ></QuestionButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
