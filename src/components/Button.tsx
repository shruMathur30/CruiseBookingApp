import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
}) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textBase,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: Colors.buttonBg,
    borderColor: Colors.buttonStroke,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.buttonStroke,
  },
  textBase: {
    fontSize: 16,
  },
  primaryText: {
    color: Colors.textPrimary,
  },
  secondaryText: {
    color: Colors.textSecondary,
  },
});
