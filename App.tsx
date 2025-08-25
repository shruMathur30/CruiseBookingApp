import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { store } from "./src/redux/store";
import { Colors } from "./src/theme/colors";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.cardBg} />
      <AppNavigator />
    </Provider>
  );
};

export default App;
