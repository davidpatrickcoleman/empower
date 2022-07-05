import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as SQLite from "expo-sqlite";
import * as MailComposer from "expo-mail-composer";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

let width = Dimensions.get("window").width;

const db = SQLite.openDatabase("db.db");

export default class Images extends Component {
  state = {
    image: null,
    uploading: false,
    shareImageAlertVisible: false
  };

  setShareImageAlertVisible = (visible) => {
    this.setState({ shareImageAlertVisible: visible });
  }

  async sendEmailToDoctor () {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT email from Doctor1 order by id asc limit 1",
        [],
        (tx, results) => {
          const isDoctorContact = true
          const email = results.rows.length > 0 ? results.rows.item(0).email : undefined
          this.sendEmailAsync(email, isDoctorContact);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    })
  }

  async sendEmailToCarer () {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT email from carerDetails order by id asc limit 1",
        [],
        (tx, results) => {
          const isDoctorContact = false
          const email = results.rows.length > 0 ? results.rows.item(0).email : undefined
          this.sendEmailAsync(email, isDoctorContact);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    })
  }

  render() {
    let { image } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Take or choose a picture to send to your Contacts.
        </Text>

        <TouchableOpacity
          onPress={this._pickImage}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            backgroundColor: "#2089DC",
            width: "90%"
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>
            Pick an image from camera roll{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this._takePhoto}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            backgroundColor: "#2089DC",
            width: "90%",
            marginTop: 10
          }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>Take a photo </Text>
        </TouchableOpacity>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </ScrollView>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, shareImageAlertVisible } = this.state;

    if (!image) {
      return;
    }

    return (
      <View style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <TouchableOpacity
          onPress={this.openShareImageAlert}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            backgroundColor: "#2089DC",
            width: "100%",
            marginTop: 10
          }}
        >
          <Text
            style={
              (styles.maybeRenderImageText, { fontSize: 25, color: "white" })
            }
          >
            Share{" "}
          </Text>
        </TouchableOpacity>
        {shareImageAlertVisible === true &&
          Alert.alert(
            "Share Photo",
            "Please select who you would like to share the photo with.",
            [
              {
                text: "Doctor",
                onPress: () => {
                  this.sendEmailToDoctor();
                }
              },
              {
                text: "Carer",
                onPress: () => {
                  this.sendEmailToCarer();
                }
              },
              {
                text: "Cancel",
                onPress: () => {
                  this.closeShareImageAlert()
                },
              }
            ],
            { cancelable: true }
          )
        }
      </View>
    );
  };

  openShareImageAlert = () => {
    this.setShareImageAlertVisible(true)
  };

  closeShareImageAlert = () => {
    this.setShareImageAlertVisible(false)
  };


  sendEmailAsync = async(email, isDoctor) => {
    this.closeShareImageAlert();
    if (email === undefined || email === null || email === "") {
      Alert.alert("No Email Address Configured", `Please enter an email address for the ${isDoctor === true ? 'Doctor' : 'Carer'} contact in the Contacts menu.`);
      return;
    }

    const isEmailClientSupportedResult = await MailComposer.isAvailableAsync();
    if (isEmailClientSupportedResult === false) {
      Alert.alert("Email client not set up", "Please set up your email client on your phone before using this feature.");
      return;
    }

    await MailComposer.composeAsync({
      recipients: [email],
      subject: "Image Share",
      body: `Hi there, please find image attached.`,
      attachments: [this.state.image]
    });
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchCameraAsync({});

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        aspectRatio: [4, 3]
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

  uploadImageAsync(pictureuri) {
    let apiUrl = "http://123.123.123.123/ABC";

    var data = new FormData();
    data.append("file", {
      uri: pictureuri,
      name: "file",
      type: "image/jpg"
    });

    fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      method: "POST",
      body: data
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center"
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 5,
    width: 250
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden"
  },
  maybeRenderImage: {
    height: width / 1.8,
    width: width
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 80,
    fontSize: 25
  }
});
