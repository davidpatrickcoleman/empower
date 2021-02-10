import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
let width = Dimensions.get("window").width;

export default class Images extends Component {
  state = {
    image: null,
    uploading: false
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Take or choose a picture to send to your practitioner.
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
      </View>
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
    let { image } = this.state;

    if (!image) {
      return;
    }

    return (
      <ScrollView style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <TouchableOpacity
          onPress={this._share}
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
      </ScrollView>
    );
  };

  _share = () => {
    Share.share({
      title: "Photo",
      url: this.state.image
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
        console.log("succ ");
        console.log(response);
      })
      .catch(err => {
        console.log("err ");
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,

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
