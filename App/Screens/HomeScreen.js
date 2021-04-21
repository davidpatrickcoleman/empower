import * as SQLite from "expo-sqlite";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import checkIfFirstLaunch from "../Components/FirstLaunch";
import { HomeScreenButton } from "../Components/HomeScreenButton1";

logoPath = require("..//..//logoEmpower2.jpg");

const db = SQLite.openDatabase("db.db");
const deviceWidth = Dimensions.get("window").width;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
      modalVisibile: true
    };
  }

  async componentDidMount() {
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({ isFirstLaunch, hasCheckedAsyncStorage: true });
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists drainData (id integer primary key not null, chestPainB integer, breathlessnessB text, drainAmount text, chestPainA text, breathlessnessA text, timestamp text);"
      );
      tx.executeSql(
        "create table if not exists catheter1 (id integer primary key not null, catheterType text);"
      );
      tx.executeSql(
        "create table if not exists carerDetails (id integer primary key not null, name text, number text, email text);"
      );
      tx.executeSql(
        "create table if not exists doctor1 (id integer primary key not null, name text, email text);"
      );
    });
  }
  add = props => {
    console.log("Click happened");

    // is text empty?
    console.log("text is" + props);

    db.transaction(tx => {
      tx.executeSql(
        "insert into catheter1 (catheterType) values (?)",
        [props],
        (_, { rows }) => {
        },
        (t, error) => {
          console.log(error);
        }
      );
      tx.executeSql("select * from catheter1", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  };
  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;
    if (!hasCheckedAsyncStorage) {
      return null;
    }
    return isFirstLaunch ? (
      <SafeAreaView style={styles.container}>
        <Image
          style={{
            resizeMode: "contain",
            flex: 1
          }}
          source={logoPath}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Empower</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisibile}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 25 }}>Please select your catheter</Text>
              <TouchableOpacity
                onPress={() => {
                  let type = "Pleurx";
                  this.add(type);
                  this.setState({ modalVisibile: false });
                }}
                style={{ marginTop: 20 }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 25
                  }}
                >
                  Pleurx
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let type = "Rocket";
                  this.add(type);
                  this.setState({ modalVisibile: false });
                }}
                style={{ marginTop: 25 }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 25
                  }}
                >
                  Rocket
                </Text>
              </TouchableOpacity>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setState({ modalVisibile: false });
                }}
              >
                <Text style={styles.textStyle}>Dismiss</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.grid1}>
          <HomeScreenButton
            navigationAction={value => {
              Alert.alert("Are you sure you want to drain?", "", [
                {
                  text: "Yes drain now",
                  onPress: () => {
                    this.props.navigation.navigate("Drain1");
                    this.add();
                  }
                },
                {
                  text: "Cancel",

                  style: "cancel"
                }
              ]);
            }}
            name={"Ready to Drain"}
            style={{
              backgroundColor: "#3F681C",
              width: "100%",
              height: "100%"
            }}
          />
        </View>

        <View style={styles.grid1}>
          <HomeScreenButton
            navigationAction={() => this.props.navigation.navigate("Image")}
            name={"Photo"}
            style={{
              backgroundColor: "#375E97",
              marginLeft: 10,
              height: "100%",
              width: "49%"
            }}
          />
          <HomeScreenButton
            navigationAction={() => this.props.navigation.navigate("History")}
            name={"History"}
            style={{
              backgroundColor: "#FFBB00",
              marginLeft: 10,
              height: "100%",
              width: "49%"
            }}
          />
        </View>
        <View style={styles.grid1}>
          <HomeScreenButton
            navigationAction={() => this.props.navigation.navigate("FAQ")}
            name={"Help"}
            style={{
              backgroundColor: "#FB6542",
              width: "100%",
              height: "100%"
            }}
          />
        </View>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <Image
          style={{
            resizeMode: "contain",
            flex: 1
          }}
          source={logoPath}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Empower</Text>

        <View style={styles.grid1}>
          <HomeScreenButton
            navigationAction={value => {
              Alert.alert("Are you sure you want to drain?", "", [
                {
                  text: "Yes drain now",
                  onPress: () => {
                    this.props.navigation.navigate("Drain1");
                    this.add();
                  }
                },
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ]);
            }}
            name={"Ready to Drain"}
            style={{
              backgroundColor: "#375E97",
              width: "100%",
              height: "100%"
            }}
          />
        </View>

        <View style={styles.grid1}>
          <HomeScreenButton
            navigationAction={() => this.props.navigation.navigate("Image")}
            name={"Photo"}
            style={{
              backgroundColor: "#FFBB00",
              marginLeft: 10,
              height: "100%",
              width: "49%"
            }}
          />
          <HomeScreenButton
            navigationAction={() => this.props.navigation.navigate("History")}
            name={"History"}
            style={{
              backgroundColor: "#3F681C",
              marginLeft: 10,
              height: "100%",
              width: "49%"
            }}
          />
        </View>
        <View style={styles.grid1}>
          <HomeScreenButton
            navigationAction={() => this.props.navigation.navigate("FAQ")}
            name={"Help"}
            style={{
              backgroundColor: "#FB6542",
              width: "100%",
              height: "100%"
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const modalMargin = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  heading: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  buttons: {
    width: "50%"
  },
  grid1: {
    flex: 2,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 30,
    margin: 10
  },
  grid2: {
    flex: 2,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 0,
    margin: 10
  },
  navbar: {
    marginBottom: "5%",
    textAlign: "left",
    fontWeight: "bold"
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
    fontSize: 20
  },
  video: {
    flex: 1,
    width: deviceWidth - modalMargin * 2 - 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HomeScreen;
