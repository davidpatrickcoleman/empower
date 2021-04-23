import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import App from "./Screens/App";
import Carer from "./Screens/Contact/Carer";
import Contacts from "./Screens/Contact/Contacts";
import Doctor from "./Screens/Contact/Doctor";
import Drain1 from "./Screens/Draining/Drain1";
import Drain2 from "./Screens/Draining/Drain2";
import Drain3 from "./Screens/Draining/Drain3";
import Drain4 from "./Screens/Draining/Drain4";
import Drain5 from "./Screens/Draining/Drain5";
import HelpVideos from "./Screens/FAQ/HelpVideos";
import Question1 from "./Screens/FAQ/Question1";
import Question2 from "./Screens/FAQ/Question2";
import Question3 from "./Screens/FAQ/Question3";
import Question4 from "./Screens/FAQ/Question4";
import Question5 from "./Screens/FAQ/Question5";
import Question6 from "./Screens/FAQ/Question6";
import Questions from "./Screens/FAQ/Questions";
import History from "./Screens/History";
import HomeScreen from "./Screens/HomeScreen";
import Image from "./Screens/Image";
import ImageShare from "./Screens/ImageShare";

const Stack = createStackNavigator();
const DrainStack = createStackNavigator();
<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>;

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Drain1" component={Drain1} />
      <Stack.Screen name="Drain2" component={Drain2} />
      <Stack.Screen name="Drain3" component={Drain3} />
      <Stack.Screen name="Drain4" component={Drain4} />
      <Stack.Screen name="Drain5" component={Drain5} />

      <Stack.Screen name="ImageShare" component={ImageShare} />
      <Stack.Screen name="Image" component={Image} options={{ title: 'Photo' }} />

      <Stack.Screen name="FAQ" component={Questions} />
      <Stack.Screen name="Question1" component={Question1} />
      <Stack.Screen name="Question2" component={Question2} />
      <Stack.Screen name="Question3" component={Question3} />
      <Stack.Screen name="Question4" component={Question4} />
      <Stack.Screen name="Question5" component={Question5} />
      <Stack.Screen name="Question6" component={Question6} />
      <Stack.Screen name="Doctor" component={Doctor} />
      <Stack.Screen name="Carer" component={Carer} />
      <Stack.Screen name="HelpVideos" component={HelpVideos} />

      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}
function DrainStackScreen() {
  return (
    <DrainStack.Navigator>
      <DrainStack.Screen name="Drain1" component={Drain1} />
    </DrainStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default props => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Drain") {
            iconName = "ios-water";
          } else if (route.name === "Contacts") {
            iconName = "ios-contact";
          }
          return <Ionicons name={iconName} size={40} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Drain" component={DrainStackScreen} />
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
  </NavigationContainer>
);
