import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.paragraph}>
        I made this page to test React Native and review some of my favorite
        games
      </Text>
    </View>
  );
}
