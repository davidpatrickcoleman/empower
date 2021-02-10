import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          flex: 2,
          marginTop: 60,
          marginBottom: 60
        }}
      >
        <View>
          <TouchableOpacity
            style={[styles.outline, { backgroundColor: "#3F681C" }]}
            onPress={() => navigation.navigate("Doctor")}
          >
            <Text style={styles.loginText}>Doctor</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.outline, { backgroundColor: "#375E97" }]}
            onPress={() => navigation.navigate("Carer")}
          >
            <Text style={styles.loginText}>Carer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  outline: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "60%",
    backgroundColor: "#33BBFF",
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 40,
    borderColor: "#fff",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2 // Android
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,

    fontSize: 40,
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 1
  }
});
