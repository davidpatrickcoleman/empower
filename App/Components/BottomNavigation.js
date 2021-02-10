import * as React from "react";
import { Button, StyleSheet, View } from "react-native";

export const MyComponent = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.buttonStyle}>
        <Button
          title={"Drain"}
          style={styles.buttons}
          onPress={() => navigation.navigate("Drain Part 1")}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title={"Home"}
          style={styles.buttons}
          onPress={() => navigation.navigate("Drain Part 2")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    flex: 1,
    textAlign: "center",
    fontSize: 24
  },
  buttons: {
    width: 50
  },
  grid: {
    flex: 3,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  navbar: {
    marginBottom: "5%",
    textAlign: "left",
    fontWeight: "bold"
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
    fontSize: 20
  }
});
