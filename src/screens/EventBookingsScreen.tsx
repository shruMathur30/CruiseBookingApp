import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";

export const EventBookingsScreen = () => {
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <Text style={{color: 'white', textAlign: 'center'}}>In Progress..</Text>
      </SafeAreaView>
    );
};
