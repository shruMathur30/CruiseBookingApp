import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../screens/HomeScreen";
import { EventBookingsScreen } from "../screens/EventBookingsScreen";
import { BookingsScreen } from "../screens/BookingsScreen";
import { Colors } from "../theme/colors";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BookingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsMain" component={BookingsScreen} />
    </Stack.Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.cardBg,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          borderTopWidth: 0,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "Home") {
            icon = require("../assets/Home.png");
          } else if (route.name === "Bookings") {
            icon = require("../assets/Booking.png");
          } else if (route.name === "Events") {
            icon = require("../assets/Calendar.png");
          } else if (route.name === "Support") {
            icon = require("../assets/Support.png");
          }

          return (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.textPrimary : Colors.icons,
              }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsStack} />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View>
              <Image
                source={require("../assets/AddIcon.png")}
                style={{ width: 58, height: 58 }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen name="Events" component={EventBookingsScreen} />
      <Tab.Screen name="Support" component={EventBookingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
