/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import About from "../screens/about";
import Header from "../shared/header";

const screens = {
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="About My App" />
        ),
      };
    },
  },
};
const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "lightgrey", height: 90 },
  },
});

export default AboutStack;
