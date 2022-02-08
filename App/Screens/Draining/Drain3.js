import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import {Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import { Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
const height = Dimensions.get("window").height;

const db = SQLite.openDatabase("db.db");
const params = [
  { label: "0ml", value: "0ml" },
  { label: "25ml", value: "25ml" },
  { label: "50ml", value: "50ml" },
  { label: "75ml", value: "75ml" },
  { label: "100ml", value: "100ml" },
  { label: "125ml", value: "125ml" },
  { label: "150ml", value: "150ml" },
  { label: "175ml", value: "175ml" },
  { label: "200ml", value: "200ml" },
  { label: "225ml", value: "225ml" },
  { label: "250ml", value: "250ml" },
  { label: "275ml", value: "275ml" },
  { label: "300ml", value: "300ml" },
  { label: "325ml", value: "325ml" },
  { label: "350ml", value: "350ml" },
  { label: "375ml", value: "375ml" },
  { label: "400ml", value: "400ml" },
  { label: "425ml", value: "425ml" },
  { label: "450ml", value: "450ml" },
  { label: "475ml", value: "475ml" },
  { label: "500ml", value: "500ml" },
  { label: "525ml", value: "525ml" },
  { label: "550ml", value: "550ml" },
  { label: "575ml", value: "575ml" },
  { label: "600ml", value: "600ml" },
  { label: "625ml", value: "625ml" },
  { label: "650ml", value: "650ml" },
  { label: "675ml", value: "675ml" },
  { label: "700ml", value: "700ml" },
  { label: "725ml", value: "725ml" },
  { label: "750ml", value: "750ml" },
  { label: "775ml", value: "775ml" },
  { label: "800ml", value: "800ml" },
  { label: "825ml", value: "825ml" },
  { label: "850ml", value: "850ml" },
  { label: "875ml", value: "875ml" },
  { label: "900ml", value: "900ml" },
  { label: "925ml", value: "925ml" },
  { label: "950ml", value: "950ml" },
  { label: "975ml", value: "975ml" },
  { label: "1000ml", value: "1000ml" }
];

export default ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const placeholder = {
    label: "Select drainage amount...",
    value: null
  };

  const add = text => {
    // is text empty?
    if (text === null || text === "") {
      console.log("text is" + text);
    }

    // Get the latest row entry from drain data table
    let ide = 0;
    db.transaction(tx => {
      tx.executeSql(
        "select id from drainData order by id desc limit 1",
        [],
        (_, { rows }) => {
          ide = rows.item(0).id;
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        "UPDATE drainData SET drainAmount = (?) WHERE id = (?)",
        [text, ide],
        (_, { rows }) => {
          console.log(rows._array);
          setSelectedValue(text);
        },
        (t, error) => {
          console.log(error);
        }
      );
      tx.executeSql("select * from drainData", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    }, forceUpdate);
  };
  const valueChange = text => {
    // is text empty?
    console.log("text is" + text);
    if (text === null || text === "") {
      console.log("text is" + text);
    }
    setSelectedValue(text);

    console.log(selectedValue);
  };

  const handleNextButton = () => {
    if (selectedValue === undefined || selectedValue === null) {
      Alert.alert("Please select a drainage amount.");
    } else {
      navigation.navigate("Drain4");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headings}>How much did you drain? </Text>
        <View
          style={{ marginBottom : 40 }}>
          <RNPickerSelect
            onValueChange={value => add(value)}
            items={params}
            placeholder={placeholder}
            useNativeAndroidPickerStyle={false}
            style={{
              placeholder: {
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
              },
              inputIOS: {
                fontSize: 25,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 4,
                color: "black",
                paddingRight: 30 // to ensure the text is never behind the icon
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: "purple",
                borderRadius: 8,
                color: "black",
                paddingRight: 30 // to ensure the text is never behind the icon
              }
            }}
          />
        </View>

        <Button
            style={styles.buttons}
          title="Next Question"
          onPress={() => handleNextButton()}
        >
          {" "}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "white"
  },

  buttons: {
    paddingTop: 20,
    marginTop: 20,
    marginLeft: 20,
  },

  input: {
    margin: 10,
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18
  },

  headings: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    margin: 5,
    marginLeft: 20,
    textAlign: "center"
  },
  slider: {
    width: "80%"
  }
});
