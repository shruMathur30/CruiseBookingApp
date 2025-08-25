import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import { RootState } from "../redux/store";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Colors } from "../theme/colors";

export const BookingsScreen = () => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"Cruise" | "Event" | "Hosting">("Event");

  const toggleModal = () => setFilterModalVisible(!isFilterModalVisible);
  const bookings = useSelector((state: RootState) => state.bookings.list);

  const imagesMap = {
    UpcomingImg: require("../assets/UpcomingImg.png"),
    DraftImg: require("../assets/DraftImg.png"),
    CompletedImg: require("../assets/CompletedImg.png"),
    CanceledImg: require("../assets/CanceledImg.png"),
  } as const;

  type ImageKey = keyof typeof imagesMap;

  const getImageSource = (imageName: string) => {
    const key = imageName.replace(/\.(png|jpg|jpeg|gif)$/i, "") as ImageKey;
    return imagesMap[key] || imagesMap.UpcomingImg;
  };


  return (
    <View style={styles.container}>
      <Header title="Bookings" />

      {/* Top Tabs */}
      <View style={styles.tabsRow}>
        {["Cruise", "Event", "Hosting"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === "Cruise" ? "Cruise Bookings" : tab === "Event" ? "Event Bookings" : "Hosting"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search + Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Image source={require("../assets/Search.png")} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.textTertiary}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <Image source={require("../assets/Filter.png")} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card booking={{ ...item, image: getImageSource(item.image) }} />}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal */}
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.6}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomWidth: 1, borderColor: '#242424' }} />

          <View style={styles.filterOptions}>
            {["All", "Up Coming", "Completed", "Draft", "Canceled"].map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterTag, isActive && styles.filterTagActive]}
                  onPress={() => {
                    setSelectedFilter(filter);
                    toggleModal();
                  }}
                >
                  <Text style={[styles.filterTagText, isActive && styles.filterTagTextActive]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.cardBg,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textTertiary,
  },
  tabTextActive: {
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondaryCardBg,
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  searchIcon: {
    width: 14,
    height: 14,
    marginRight: 10,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.secondaryCardBg,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  modalClose: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: 'center',
    marginTop: 30
  },
  filterTag: {
    width: 100,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.buttonStroke,
    backgroundColor: "transparent",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  filterTagActive: {
    backgroundColor: Colors.buttonBg,
  },
  filterTagText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textTertiary,
  },
  filterTagTextActive: {
    color: Colors.textPrimary,
  },
});
