import React from 'react';
import { StyleSheet } from 'react-native';


export const Video = (props) => 
(
    <Video
    useNativeControls={true}
    source={props.path}
    rate={1.0}
    volume={1.0}
    isMuted={false}
    resizeMode="cover"
    shouldPlay
    isLooping
    style={{ width: 350, height: 300 }}
  />
 )

// Defining prop types for this component

const styles = StyleSheet.create({

titles: 
{
  fontSize: 20,

}
  

  
});
