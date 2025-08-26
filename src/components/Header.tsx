import React from "react";
import { Colors } from "../theme/colors";
import { Text } from "react-native";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
      <Text style={{ color: Colors.textPrimary, fontSize: 20, fontWeight: '700', paddingVertical: 20, marginLeft: 20 }}>{title}</Text>
  );
};
