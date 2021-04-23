import React from "react";
import { Text, View } from "react-native";


export const HistoryItem = props => (
  <View>
    <Text style={{ fontSize: 20 }}>
      Chest before draining: {props.chestPainB}
    </Text>
    <Text style={{ fontSize: 20 }}>
      Chest after draining: {props.chestPainA}
    </Text>
    <Text style={{ fontSize: 20 }}>
      Breathing before draining: {props.breathlessnessB}
    </Text>
    <Text style={{ fontSize: 20 }}>
      Breathing after draining: {props.breathlessnessA}
    </Text>
    <Text style={{ fontSize: 20 }}>Drain Amount: {props.drainAmount}</Text>
  </View>
);

