import * as ImagePicker from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";
import React, { useEffect, useState } from "react";
import { Button, Image, Platform, ScrollView } from "react-native";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          statusCamera
        } = await ImagePicker.requestCameraPermissionsAsync();

        const {
          statusCameraRoll
        } = await ImagePicker.requestCameraRollPermissionsAsync();
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
  };
  const share = async () => {
    console.log(image.uri);
    MailComposer.composeAsync({
      recipients: ["brogan9@gmail.com"], // array of email addresses
      subject: "HEY",
      body: "HEY",
      attachments: [image.uri]
    });
  };
  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start"
      }}
    >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take Photo " onPress={takeImage} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}

      <Button title="Send MaiL" onPress={share}></Button>
    </ScrollView>
  );
}
