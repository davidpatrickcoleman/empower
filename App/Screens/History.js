import * as MailComposer from "expo-mail-composer";
import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";
import { jsonToCSV } from "react-papaparse";
import { HistoryItem } from ".//..//Components/HistoryItem";

const db = SQLite.openDatabase("db.db");
let data;
export default ({ navigation }) => {
  const [items, setItems] = useState();
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  let ide = 0;
  const [elements, setElements] = useState();
  const [email, setEmail] = useState();
  const [emailItems, setEmailItems] = useState();
  const [csv, setCsv] = useState();

  let historyItem = [];
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM drainData order by timestamp desc",
        [],
        (tx, results) => {
          // sql query to get all table data and storing it in 'results' variable
          let data = results.rows.length;
          let items = []; //creating empty array to store the rows of the sql table data

          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i)); //looping through each row in the table and storing it as object in the 'users' array
          }

          setElements(items);
        },
        (t, error) => {
          console.log(error);
        }
      );
      tx.executeSql(
        "SELECT email from Doctor1",
        [],
        (tx, results) => {
          // sql query to get all table data and storing it in 'results' variable
          console.log(results);
          setEmail(results.rows.item(0).email);
          console.log(email);
        },
        (t, error) => {
          console.log(error);
        }
      );
      tx.executeSql(
        "SELECT * FROM drainData where timestamp > (SELECT DATETIME('now', '-7 day')) order by timestamp desc",
        [],
        (tx, results) => {
          // sql query to get all table data and storing it in 'results' variable
          let data = results.rows.length;
          let items = []; //creating empty array to store the rows of the sql table data

          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i)); //looping through each row in the table and storing it as object in the 'users' array
          }

          setEmailItems(items);
        },
        (t, error) => {
          console.log(error);
        }
      );
    });
  }, []);
  async function sendEmailAsync() {
    if (email == null || email == "") {
      Alert.alert("Please enter doctor email in Contact settings");
    }

    console.log("TEST4" + JSON.stringify(emailItems));
    let result = await MailComposer.composeAsync({
      recipients: [email],
      subject: "Patient Information",
      body: jsonToCSV(JSON.stringify(emailItems))
    });
    const jsonObject = JSON.stringify(emailItems);
    setCsv(jsonToCSV(jsonObject));
    console.log("CSV" + csv);
    alert(result.status);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          onPress={sendEmailAsync}
          buttonStyle={{
            alignItems: "stretch",
            marginTop: 10,
            fontSize: 20,
            width: "100%"
          }}
          title="Send drain information to your doctor"
        ></Button>

        {elements &&
          elements.map(item => (
            <Card containerStyle={styles.card} key={item.id}>
              <Card.Title>Timestamp: {item.timestamp}</Card.Title>
              <Card.Divider />
              <HistoryItem
                chestPainB={item.chestPainB}
                chestPainA={item.chestPainA}
                breathlessnessB={item.breathlessnessB}
                breathlessnessA={item.breathlessnessA}
                drainAmount={item.drainAmount}
              />
            </Card>
          ))}
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
    backgroundColor: "white",
    flex: 1
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    width: "92%",
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center"
  }
});
