import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const db = SQLite.openDatabase("db.db");
export default ({ navigation }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [isFirstTime, setIsFirstTime] = useState();

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists carerDetails (id integer primary key not null, name text, number text);"
      );

      tx.executeSql(
        "SELECT COUNT(*) as count FROM carerDetails",
        [],
        (tx, results) => {
         
          let count = null; //creating empty array to store the rows of the sql table data

          console.log(results.rows);
          count = results.rows.item(0).count;
          console.log("HEY" + count);
          setIsFirstTime(count);
          console.log(count);
          if (count >= 1) {
            tx.executeSql(
              "Select * from carerDetails order by id asc limit 1",
              [],
              (_, { rows }) => {
                setNumber(rows.item(0).number);
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
    // is text empty?
    console.log("name is" + name);
    console.log("number is" + number);

    if (name === null || name === "") {
      console.log("Name is empty");
    }
    if (number === null || number === "") {
      console.log("number is empty");
    }
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into carerDetails (name, number) values (?, ?)",
          [name, number],
          (_, { rows }) => {
            console.log(rows._array);
          },
          (t, error) => {
            console.log(error);
          }
        );
        Alert.alert("Carer contact details successfully added ");
        tx.executeSql("select * from carerDetails", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },

      forceUpdate
    );
    Keyboard.dismiss();
  };
  const update = () => {
    // is text empty?
    console.log("name is" + name);
    console.log("number is" + number);

    if (name === null || name === "") {
      console.log("Name is empty");
    }
    if (number === null || number === "") {
      console.log("number is empty");
    }
    db.transaction(
      tx => {
        tx.executeSql(
          "UPDATE carerDetails SET name = (?), email = (?) WHERE id = (?)",
          [name, number, 1],
          (_, { rows }) => {
            console.log(rows._array);
          },
          (t, error) => {
            console.log(error);
          }
        );
        Alert.alert("Carer contact details successfully updated ");

        tx.executeSql("select * from carerDetails", [], (_, { rows }) =>
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
    <View style={styles.container}>
      <View style={styles.box}>
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

        {isFirstTime === 0 ? (
          <Button title="OK" onPress={add} />
        ) : (
          <Button title="Update" onPress={update} />
        )}
      </View>
    </View>
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
