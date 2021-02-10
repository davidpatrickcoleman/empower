import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { EmoitconImages } from "../..//Constants/Constants";

const db = SQLite.openDatabase("db.db");
logoPath2 = require("..//..//..//test.jpg");

const params = [
  { label: "5 Worse Pain", value: 5 },
  { label: "4 Lots of Pain", value: 4 },
  { label: "3 More Pain", value: 3 },
  { label: "2 Some Pain", value: 2 },
  { label: "1 Little Pain", value: 1 },
  { label: "0 No Pain", value: 0 }
];
export default ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("0");

  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists drainData (id integer primary key not null, chestPainB integer, breathlessnessB text, drainAmount text, chestPainA text, breathlessnessA text, timestamp text);"
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
          "insert into drainData (chestPainB, timestamp) values (?, CURRENT_TIMESTAMP)",
          [text],
          (_, { rows }) => {
            console.log("1");
          },
          (t, error) => {
            console.log(error);
          }
        );
        tx.executeSql("select * from drainData", [], (_, { rows }) =>
          console.log(1)
        );
      },

      forceUpdate
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headings}>How is your chest feeling? </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ marginTop: 5, marginRight: 10 }}>
            {EmoitconImages &&
              EmoitconImages.map(dest => (
                <Image
                  key={dest.id}
                  style={{ height: 70, width: 70, marginTop: 5 }}
                  source={dest.img}
                  resizeMode="contain"
                />
              ))}
          </View>
          <View>
            <RadioForm
              style={styles.buttons}
              radio_props={params}
              initial={0}
              labelStyle={{
                fontSize: 18,
                paddingTop: 10,
                justifyContent: "flex-end"
              }}
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
                        navigation.navigate("Drain2");
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
      </View>
    </SafeAreaView>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",

    alignItems: "center"
  },

  buttons: {
    marginTop: 10,
    marginLeft: 20,

    alignItems: "flex-start"
  },

  headings: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    margin: 5,

    textAlign: "center"
  }
});
