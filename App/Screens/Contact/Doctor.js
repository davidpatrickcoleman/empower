import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import { Alert, Button, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";



const db = SQLite.openDatabase("db.db");
export default ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [isFirstTime, setIsFirstTime] = useState();

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM doctor1",
        [],
        (tx, results) => {
          // sql query to get all table data and storing it in 'results' variable
          let count = null; //creating empty array to store the rows of the sql table data

          console.log(results.rows);
          count = results.rows.item(0).count;
          setIsFirstTime(count);
          if (count >= 1) {
            tx.executeSql(
              "Select * from doctor1 order by id asc limit 1",
              [],
              (_, { rows }) => {
                setEmail(rows.item(0).email);
                setName(rows.item(0).name);
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
          "insert into doctor1 (name, email) values (?, ?)",
          [name, email],
          (_, { rows }) => {
            console.log(JSON.stringify(rows._array));
          },
          (t, error) => {
            console.log(error);
          }
        );
        Alert.alert("Doctor contact details successfully added ");

        tx.executeSql("select * from doctor1", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },

      forceUpdate
    );
    Keyboard.dismiss();
  };
  const update = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          "UPDATE doctor1 SET name = (?), email = (?) WHERE id = (?)",
          [name, email, 1],
          (_, { rows }) => {
            console.log(JSON.stringify(rows._array));
          },
          (t, error) => {
            console.log(error);
          }
        );
        Alert.alert("Doctor contact details successfully updated ");

        tx.executeSql("select * from doctor1", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>
      <View style={styles.box}>
        <Text style={{ fontSize: 24 }}>Enter Doctor's name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Doctor's name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <Text style={{ fontSize: 24 }}>Enter Doctor's email:</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Enter Doctor's email"
          value={email}
          onChangeText={email => setEmail(email)}
        />

        {isFirstTime === 0 ? (
          <Button title="OK" onPress={add} />
        ) : (
          <Button title="Update" onPress={update} />
        )}
      </View>
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
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
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
