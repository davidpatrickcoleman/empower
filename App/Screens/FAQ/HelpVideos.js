import * as SQLite from "expo-sqlite";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

let width = Dimensions.get("window").width;

const db = SQLite.openDatabase("db.db");

class HelpVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      video: null,
      load1: true,
      load2: true
    };
  }

  async componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "select * from catheter1 where id = 1",
        [],
        (_, { rows }) => {
          console.log(JSON.stringify(rows));
          this.setState({ type: rows.item(0).catheterType });
        }
      );
    });
  }

  render() {
    const videoOneId = "VMr11BXbip4";
    const videoTwoId = "pbcdAQBpjgI";

    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
          PleurX Catheter{" "}
        </Text>

        <WebView
          style={styles.video}
          onLoad={() => this.setState({ load1: false })}
          javaScriptEnabled={true}
          source={{
            uri:
              "https://www.youtube.com/embed/" +
              videoOneId +
              "?rel=0&autoplay=0&showinfo=0&controls=0"
          }}
        />

        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
          Rocket Catheter{" "}
        </Text>
        <WebView
          style={styles.video}
          onLoad={() => this.setState({ load1: false })}
          javaScriptEnabled={true}
          source={{
            uri:
              "https://www.youtube.com/embed/" +
              videoTwoId +
              "?rel=0&autoplay=0&showinfo=0&controls=0"
          }}
        />
      </SafeAreaView>
    );
  }
}
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 25,
    backgroundColor: "white"
  },
  video: {
    flex: 1,
    width: deviceWidth - 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
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

export default HelpVideos;
