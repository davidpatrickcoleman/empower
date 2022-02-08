import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { EmoitconImages } from "../..//Constants/Constants";
import {drainStyles} from "../../Constants/Constants";

const db = SQLite.openDatabase("db.db");
const destinations = [
  { img: require("..//..//..//five.png") },
  { img: require("..//..//..//four.png") },
  { img: require("..//..//..//three.png") },
  { img: require("..//..//..//two.png") },
  { img: require("..//..//..//one.png") },
  { img: require("..//..//..//zero.png") }
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
    console.log("is is" + ide);

    if (text === null || text === "") {
      console.log("null");
    }
    db.transaction(
      tx => {
        tx.executeSql(
          "UPDATE drainData SET breathlessnessB = (?) WHERE id = (?)",
          [text, ide],
          (_, { rows }) => {
            console.log(rows._array);
          },
          (t, error) => {
            console.log(error);
          }
        );
        console.log(text);
      },

      forceUpdate
    );
  };
  return (
    <SafeAreaView style={drainStyles.container}>
      <ScrollView>
        <Text style={drainStyles.headings}>How is your breathing? </Text>
        <View style={drainStyles.mainView}>
          <View style={drainStyles.imageView}>
            {EmoitconImages &&
              EmoitconImages.map(dest => (
                <Image
                  key={dest.id}
                  style={drainStyles.imageStyle}
                  source={dest.img}
                  resizeMode="contain"
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
                console.log("VALUE IS +" + value);
                setSelectedValue(value);
                Alert.alert(
                  "Selected: " + value + "",
                  "Is this Correct?",
                  [
                    {
                      text: "Confirm",
                      onPress: () => {
                        add(value);
                        navigation.navigate("Drain3");
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
