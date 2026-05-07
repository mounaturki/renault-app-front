import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SERVICES = [
  { id: 1, icon: "🔧", label: "Pneus" },
  { id: 2, icon: "🚿", label: "Lavage" },
  { id: 3, icon: "🛢️", label: "Vidange" },
  { id: 4, icon: "🆘", label: "Dépannage" },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AB</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Ahmed Ben Ali</Text>
            <Text style={styles.headerSub}>🇫🇷 Français</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Modifier</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Ma Voiture</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Car Card */}
        <View style={styles.carCard}>
          <TouchableOpacity
            style={styles.addCarBtn}
            onPress={() => navigation.navigate("PlateType")}
          >
            <Text style={styles.addCarIcon}>＋</Text>
            <Text style={styles.addCarText}>Ajouter une voiture</Text>
          </TouchableOpacity>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Nos Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {SERVICES.map((s) => (
              <TouchableOpacity key={s.id} style={styles.serviceCard}>
                <Text style={styles.serviceIcon}>{s.icon}</Text>
                <Text style={styles.serviceLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navAddBtn}
          onPress={() => navigation.navigate("PlateType")}
        >
          <Text style={styles.navAddIcon}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#8B0000",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#8B0000", fontWeight: "bold", fontSize: 14 },
  headerInfo: { flex: 1, marginLeft: 12 },
  headerName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  headerSub: { color: "#ffcdd2", fontSize: 12 },
  editBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  editText: { color: "#fff", fontSize: 12 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  scroll: { flex: 1 },
  carCard: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  addCarBtn: { alignItems: "center" },
  addCarIcon: { fontSize: 32, color: "#8B0000", marginBottom: 8 },
  addCarText: { color: "#8B0000", fontWeight: "600" },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionLabel: { fontSize: 16, fontWeight: "bold", color: "#222" },
  seeAll: { color: "#8B0000", fontSize: 13 },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  serviceCard: {
    width: "46%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 1,
  },
  serviceIcon: { fontSize: 28, marginBottom: 6 },
  serviceLabel: { color: "#333", fontWeight: "500" },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: { padding: 8 },
  navIcon: { fontSize: 22 },
  navAddBtn: {
    backgroundColor: "#8B0000",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  navAddIcon: { color: "#fff", fontSize: 24 },
});
