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
import LinearGradient from "react-native-linear-gradient";

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
      <TouchableOpacity style={[styles.button, styles.secondaryButton, { backgroundColor: Colors.cardBg }]}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );

    const primaryButton = (label: string, gradient?: boolean) => (
      <LinearGradient
        colors={gradient ? ["#C9C9C9", "#C9C9C9", "#838383"] : ["#202020", "#202020"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.button, styles.primaryButton]}
      >
        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={[styles.buttonText, { color: gradient ? Colors.primary : Colors.white }]}>{label}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );


    switch (booking.status) {
      case "Up Coming":
        return (
          <>
            {secondaryButton("View Tickets")}
            {primaryButton("View Details", false)}
          </>
        );
      case "In Draft":
        return (
          <>
            {secondaryButton("Delete")}
            {primaryButton("Continue To Booking", true)}
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
        return Colors.textTertiary;
      default:
        return Colors.textTertiary;
    }
  };

  return (
    <View style={styles.card}>
      {booking.status !== 'In Draft' ? <Text style={styles.bookingId}>Booking ID: #{booking.id}</Text> : <Text style={{marginTop: 0}}></Text>}
      <View style={styles.topSection}>
        <Image source={booking.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{booking.title}</Text>
          <View style={styles.imgRow}>
            <Image
              source={require("../assets/CalendarCheck.png")}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{booking.date}</Text>
          </View>

          <View style={styles.imgRow}>
            <Image
              source={require("../assets/LocationPin.png")}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{booking.location}</Text>
          </View>

        </View>
      </View>

      <View style={styles.bottomSection}>
        {/* Left cut */}
        <View style={[styles.sideCut, styles.leftCut]} />

        {/* Right cut */}
        <View style={[styles.sideCut, styles.rightCut]} />

        {/* Dashed Line */}
        <View style={styles.divider} />

        {/* Status */}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:  </Text>
          <Text style={[styles.statusValue, { color: getStatusColor() }]}>
            {booking.status}
          </Text>
        </View>
        <View style={styles.buttonRow}>{renderButtons()}</View>
      </View>
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
    color: Colors.neonGreen,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 16,
  },
  infoText: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20
  },
  statusLabel: {
    color: Colors.textTertiary,
    fontSize: 14,
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
    borderRadius: 20,
    marginHorizontal: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: Colors.buttonBg,
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
    textAlign: 'center'
  },
  imgRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: "contain",
    tintColor: "#4B4B4B",
  },
  bottomSection: {
    marginTop: 10,
    position: "relative",
  },
  sideCut: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    top: -14,
    zIndex: 10,
  },
  leftCut: { left: -14 },
  rightCut: { right: -14 },
  divider: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.cardStroke,
    marginHorizontal: 0,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#B0B0B0",
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: "#B0B0B0",
  }
});
