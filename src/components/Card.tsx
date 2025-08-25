import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType 
} from "react-native";
import { Colors } from "../theme/colors";

interface Booking {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "Up Coming" | "In Draft" | "Completed" | "Canceled";
  image: ImageSourcePropType;
}

interface CardProps {
  booking: Booking;
}

export const Card: React.FC<CardProps> = ({ booking }) => {
  const renderButtons = () => {
    const secondaryButton = (label: string) => (
      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );

    const primaryButton = (label: string) => (
      <TouchableOpacity style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );

    switch (booking.status) {
      case "Up Coming":
        return (
          <>
            {secondaryButton("View Tickets")}
            {primaryButton("View Details")}
          </>
        );
      case "In Draft":
        return (
          <>
            {secondaryButton("Delete")}
            {primaryButton("Continue To Booking")}
          </>
        );
      case "Completed":
        return (
          <>
            {secondaryButton("View Tickets")}
            {primaryButton("View Details")}
          </>
        );
      case "Canceled":
        return primaryButton("View Details");
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case "Up Coming":
        return Colors.success.green5;
      case "In Draft":
        return Colors.warning.orange4;
      case "Completed":
        return Colors.success.green4;
      case "Canceled":
        return Colors.error.red4;
      default:
        return Colors.textTertiary;
    }
  };

  return (
    <View style={styles.card}>
      {/* Side Cuts */}
      <View style={[styles.sideCut, styles.leftCut]} />
      <View style={[styles.sideCut, styles.rightCut]} />

      {booking.status !== 'In Draft' ? <Text style={styles.bookingId}>Booking ID: #{booking.id}</Text> : <Text style={styles.bookingId}></Text>}

      {/* Image + Info */}
      <View style={styles.row}>
        <Image source={booking.image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title}>{booking.title}</Text>
          <Text style={styles.infoText}>📅 {booking.date}</Text>
          <Text style={styles.infoText}>📍 {booking.location}</Text>
        </View>
      </View>

      {/* Dashed Line */}
      <View style={styles.divider} />

      {/* Status */}
      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={[styles.statusValue, { color: getStatusColor() }]}>
          {booking.status}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>{renderButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 3,
    position: "relative",
    overflow: "visible",
  },
  bookingId: {
    color: Colors.success.green5,
    fontSize: 12,
    fontWeight: "600",
    margin: 12,
    marginLeft: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoText: {
    color: Colors.textTertiary,
    fontSize: 13,
    marginBottom: 2,
  },
  divider: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.cardStroke,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  statusLabel: {
    color: Colors.textTertiary,
    fontSize: 14,
    marginRight: 6,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.buttonStroke,
  },
  primaryButton: {
    backgroundColor: Colors.buttonBg,
  },
  secondaryButton: {
    backgroundColor: Colors.secondaryCardBg,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
  sideCut: {
    position: "absolute",
    width: 28,
    height: 28,
    backgroundColor: "#000",
    zIndex: 5,
    top: "45%",
  },
  leftCut: {
    left: -14,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightCut: {
    right: -14,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
