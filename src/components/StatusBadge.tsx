import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface StatusBadgeProps {
  status: "Up Coming" | "In Draft" | "Completed" | "Canceled";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = Colors.warning.orange3;
  if (status === "Completed") bgColor = Colors.success.green3;
  else if (status === "Canceled") bgColor = Colors.error.red3;
  else if (status === "Up Coming") bgColor = Colors.success.green2;

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
});
