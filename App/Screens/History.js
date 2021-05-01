import * as MailComposer from "expo-mail-composer";
import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import moment from 'moment';
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
  const [shareInfoAlertVisible, setShareInfoAlertVisible] = useState();

  let historyItem = [];
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM drainData order by timestamp desc",
        [],
        (tx, results) => {
          // sql query to get all table data and storing it in 'results' variable
          let items = []; //creating empty array to store the rows of the sql table data

          const numResults = results.rows.length
          for (let i = 0; i < numResults; i++) {
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


  async function sendEmailToDoctor () {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT email from Doctor1 order by id asc limit 1",
        [], 
        (tx, results) => {
          const isDoctorContact = true
          const emailFromDb = results.rows.length > 0 ? results.rows.item(0).email : undefined
          sendEmailAsync(emailFromDb, isDoctorContact);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    })
  }

  async function sendEmailToCarer () {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT email from carerDetails order by id asc limit 1",
        [], 
        (tx, results) => {
          const isDoctorContact = false
          const emailFromDb = results.rows.length > 0 ? results.rows.item(0).email : undefined
          sendEmailAsync(emailFromDb, isDoctorContact);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    })
  }

  async function sendEmailAsync(emailContact, isDoctor) {
    setShareInfoAlertVisible(false);

    if (emailContact === undefined || emailContact === null || emailContact === "") {
      Alert.alert("No Email Address Configured", `Please enter an email address for the ${isDoctor === true ? 'Doctor' : 'Carer'} contact in the Contacts menu.`);
      return;
    }

    const isEmailClientSupportedResult = await MailComposer.isAvailableAsync()
    if (isEmailClientSupportedResult === false) {
      Alert.alert("Email client not set up", "Please set up your email client on your phone before using this feature.")
      return;
    }

    await MailComposer.composeAsync({
      recipients: [emailContact],
      subject: "Patient Information",
      body: formatDrainResultsIntoHTML(emailItems),
      isHtml: true
    });

    const jsonObject = JSON.stringify(emailItems);
    setCsv(jsonToCSV(jsonObject));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          onPress={ () => setShareInfoAlertVisible(true)}
          buttonStyle={{
            alignItems: "stretch",
            margin: 10,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 20,
            width: "95%"
          }}
          title="Send Drain Information"
        ></Button>

        {elements &&
          elements.map(item => (
            <Card containerStyle={styles.card} key={item.id}>
              <Card.Title>Timestamp: {moment(moment.utc(item.timestamp).local()).format('YYYY-MM-DD HH:mm')}</Card.Title>
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
      
      {shareInfoAlertVisible === true &&
          Alert.alert(
            "Share Drain Information",
            "Please select who you would like to share the drain information with.",
            [
              {
                text: "Doctor",
                onPress: () => {
                  sendEmailToDoctor();
                }
              },
              {
                text: "Carer",
                onPress: () => {
                  sendEmailToCarer();
                }
              },
              {
                text: "Cancel",
                onPress: () => {
                  setShareInfoAlertVisible(false)
                },
              }
            ],
            { cancelable: true }
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const formatDrainResultsIntoHTML = (drainageInfoItems) => {
  let tableBodyHtml=''
  const numResults = drainageInfoItems.length

  for (let i = 0; i < numResults; i = i + 1) {
    const drainageInfo = drainageInfoItems[i]
    tableBodyHtml += `
      <tr>
        <td style="border: 1px solid #3366ff;font-size: 10px; padding:8px; text-align: center;">${moment(moment.utc(drainageInfo.timestamp).local()).format('YYYY-MM-DD HH:mm')}</td>
        <td style="border: 1px solid #3366ff;font-size: 10px; padding:8px; text-align: center;">${drainageInfo.drainAmount}</td>
        <td style="border: 1px solid #3366ff;font-size: 10px; padding:8px; text-align: center;">${drainageInfo.chestPainB} / 5</td>
        <td style="border: 1px solid #3366ff;font-size: 10px; padding:8px; text-align: center;">${Math.floor(drainageInfo.chestPainA)} / 5</td>
        <td style="border: 1px solid #3366ff;font-size: 10px; padding:8px; text-align: center;">${Math.floor(drainageInfo.breathlessnessB)} / 5</td>
        <td style="border: 1px solid #3366ff;font-size: 10px; padding:8px; text-align: center;">${Math.floor(drainageInfo.breathlessnessA)} / 5</td>
      </tr>
    `
  }

  return `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    </head>
    <body>
      <p>Hi, please see below my drainage volumes and symptom scores.</p><br />
      <table style="border-collapse: collapse;font-family: arial, sans-serif; width: 90%">
        <tr style="border: 1px solid #3366ff;">
          <th style="background-color: #3366ff;color: white;font-size: 10px; padding:8px;">Time</th>
          <th style="background-color: #3366ff;color: white;font-size: 10px; padding:8px;">Drain</th>
          <th style="background-color: #3366ff;color: white;font-size: 10px; padding:8px;">Chest Pain Before</th>
          <th style="background-color: #3366ff;color: white;font-size: 10px; padding:8px;">Chest Pain After</th>
          <th style="background-color: #3366ff;color: white;font-size: 10px; padding:8px;">Breathlessness Before</th>
          <th style="background-color: #3366ff;color: white;font-size: 10px; padding:8px;">Breathlessness After</th>
        </tr>
        ${tableBodyHtml}
      </table>
    </body>
  </html>
  `
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
