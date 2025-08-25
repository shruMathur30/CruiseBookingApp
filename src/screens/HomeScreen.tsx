import React from "react";
import {  Text, View } from "react-native";
import { Colors } from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <Text style={{color: 'white', textAlign: 'center'}}>Welcome to cruise booking app</Text>
    </SafeAreaView>
  );
};
