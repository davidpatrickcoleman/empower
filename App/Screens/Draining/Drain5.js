import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView, ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import {drainStyles} from "../../Constants/Constants";

const db = SQLite.openDatabase("db.db");

const destinations = [
  { id: 1, img: require("..//..//..//five.png") },
  { id: 2, img: require("..//..//..//four.png") },
  { id: 3, img: require("..//..//..//three.png") },
  { id: 4, img: require("..//..//..//two.png") },
  { id: 5, img: require("..//..//..//one.png") },
  { id: 6, img: require("..//..//..//zero.png") }
];

const params = [
  { label: "5 Severe Breathlessness", value: 5 },
  { label: "4 Very Breathless", value: 4 },
  { label: "3 More Breathless", value: 3 },
  { label: "2 Some Breathlessness", value: 2 },
  { label: "1 Little Breathless", value: 1 },
  { label: "0 No Breathlessness", value: 0 }
];
export default ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("0");
  const [id, setId] = useState("0");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [ide, setIde] = useState(0);
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "select id from drainData order by id desc limit 1",
        [],
        (_, { rows }) => {
          setIde(rows.item(0).id);
          console.log("WHOOO" + ide);
        }
      );
    });
  }, []);

  const add = text => {
    // is text empty?
    console.log("text is" + text);
    if (text === null || text === "") {
      console.log("null");
    }
    db.transaction(
      tx => {
        tx.executeSql(
          "UPDATE drainData SET breathlessnessA = (?) WHERE id = (?)",
          [text, ide],
          (_, { rows }) => {
            console.log(rows._array);
          },
          (t, error) => {
            console.log(error);
          }
        );
        console.log(text);
        tx.executeSql("select * from drainData", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },

      forceUpdate
    );
  };
  return (
    <SafeAreaView style={drainStyles.container}>
      <ScrollView>
        <Text style={drainStyles.headings}>
          How is your breathing after draining?
        </Text>
        <View style={drainStyles.mainView}>
          <View style={drainStyles.imageView}>
            {destinations &&
              destinations.map(dest => (
                <Image
                  key={dest.id}
                  style={drainStyles.imageStyle}
                  source={dest.img}
                  resizeMode="cover"
                />
              ))}
          </View>
          <View style={drainStyles.choiceView}>
            <RadioForm
              style={drainStyles.buttons}
              radio_props={params}
              initial={0}
              labelStyle={drainStyles.buttonLabels}
              buttonSize={60}
              animation={true}
              onPress={value => {
                setSelectedValue(value);
                Alert.alert(
                  "Selected: " + value + "",
                  "Is this Correct?",
                  [
                    {
                      text: "Confirm",
                      onPress: () => {
                        console.log("Ask me later pressed");
                        add(value);
                        navigation.navigate("Home");
                      }
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    }
                  ],
                  { cancelable: true }
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
