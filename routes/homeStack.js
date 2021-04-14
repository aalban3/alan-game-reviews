/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";
import Header from "../shared/header";
const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Alan's Games" />
        ),
      };
    },
  },
  Reviews: {
    screen: ReviewDetails,
    navigationOptions: {
      title: "",
    },
  },
};
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "lightgrey", height: 90 },
  },
});

export default HomeStack;
