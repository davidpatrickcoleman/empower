import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const db = SQLite.openDatabase("db.db");
export default ({ navigation }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [isFirstTime, setIsFirstTime] = useState();

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM carerDetails",
        [],
        (tx, results) => {

          let count = null; //creating empty array to store the rows of the sql table data

          count = results.rows.item(0).count;
          setIsFirstTime(count);

          if (count >= 1) {
            tx.executeSql(
              "Select * from carerDetails order by id asc limit 1",
              [],
              (_, { rows }) => {
                setNumber(rows.item(0).number);
                setName(rows.item(0).name);
                setEmail(rows.item(0).email);
              }
            );
          }
        },
        (t, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  const add = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into carerDetails (name, number, email) values (?, ?, ?)",
          [name, number, email],
          (_, { rows }) => {
            console.log(JSON.stringify(rows._array));
          },
          (t, error) => {
            console.log(error);
          }
        );
        Alert.alert("Carer contact details successfully added ");
      },

      forceUpdate
    );
    Keyboard.dismiss();
  };
  const update = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "UPDATE carerDetails SET name = (?), number = (?), email = (?) WHERE id = (?)",
          [name, number, email, 1],
          (_, { rows }) => {
            console.log(JSON.stringify(rows._array));
          },
          (t, error) => {
            console.log(error);
          }
        );
        Alert.alert("Carer contact details successfully updated ");
      },

      forceUpdate
    );
    Keyboard.dismiss();
  };
  // Whenever the textinput value changes
  const txtHandler = enteredName => {
    setName(enteredName);
  };

  // when the OK button is pressed
  const btnHandler = () => {
    // do whatever you like with the name typed into the text field

    // dismiss the Keybaord
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.box}>
        <Text style={{ fontSize: 24 }}>Enter Carer's Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Carers's Name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <Text style={{ fontSize: 24 }}>Enter Carer's Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Carer's Number"
          value={number}
          onChangeText={number => setNumber(number)}
        />

        <Text style={{ fontSize: 24 }}>Enter Carer's Email:</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Enter Carer's Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />

        {isFirstTime === 0 ? (
          <Button title="OK" onPress={add} />
        ) : (
          <Button title="Update" onPress={update} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  box: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    borderWidth: 2,
    borderColor: "#33BBFF",
    fontSize: 22
  },
  input: {
    padding: 10,
    marginVertical: 20,
    width: "90%",
    borderWidth: 3,
    borderColor: "#33BBFF",
    fontSize: 22
  }
});
