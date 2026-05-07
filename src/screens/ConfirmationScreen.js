import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmationScreen({ navigation, route }) {
  const { form, plateType } = route.params;

  const InfoRow = ({ label, value }) =>
    value ? (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Success header */}
        <View style={styles.successHeader}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Renault enregistrée !</Text>
          <Text style={styles.successSub}>
            Votre véhicule a été ajouté avec succès
          </Text>
        </View>

        {/* Vehicle card */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleCardHeader}>
            <View>
              <Text style={styles.vehicleCardBrand}>Renault</Text>
              <Text style={styles.vehicleCardModel}>{form.vehicleModel}</Text>
              <Text style={styles.vehicleCardSub}>
                {form.vehicleYear} • {form.fuelType}
              </Text>
            </View>
            <Text style={styles.vehicleEmoji}>🚗</Text>
          </View>

          {/* Plate */}
          <View style={styles.plateRow}>
            <View
              style={[
                styles.plateBadge,
                plateType === 'foreign' && styles.plateBadgeForeign,
              ]}
            >
              <Text style={styles.plateText}>{form.plateNumber}</Text>
              <Text style={styles.plateSubText}>
                {plateType === 'tunisian' ? '🇹🇳 Tunisie' : '🌍 Étranger'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Details */}
          <InfoRow label="Marque" value="Renault" />
          <InfoRow label="Modèle" value={form.vehicleModel} />
          <InfoRow label="Couleur" value={form.vehicleColor} />
          <InfoRow label="Année" value={form.vehicleYear} />
          <InfoRow label="Carburant" value={form.fuelType} />
          <InfoRow label="Puissance" value={form.horsepower ? `${form.horsepower} CV` : null} />
          <InfoRow label="Kilométrage" value={form.kilometrage ? `${form.kilometrage} km` : null} />

          {form.vinNumber ? (
            <>
              <View style={styles.divider} />
              <InfoRow label="VIN" value={form.vinNumber} />
            </>
          ) : null}
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeBtnText}>ALLER À L'ACCUEIL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addAnotherBtn}
          onPress={() => navigation.navigate('PlateType')}
        >
          <Text style={styles.addAnotherText}>＋ Ajouter un autre Renault</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  successHeader: {
    backgroundColor: '#8B0000',
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkIcon: { fontSize: 32, color: '#8B0000' },
  successTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  successSub: { color: '#ffcdd2', fontSize: 14 },
  vehicleCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  vehicleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  vehicleCardBrand: { fontSize: 12, color: '#8B0000', fontWeight: '600', letterSpacing: 1 },
  vehicleCardModel: { fontSize: 22, fontWeight: 'bold', color: '#111', marginVertical: 2 },
  vehicleCardSub: { fontSize: 13, color: '#888' },
  vehicleEmoji: { fontSize: 50 },
  plateRow: { marginBottom: 16 },
  plateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff5f5',
    borderWidth: 2,
    borderColor: '#8B0000',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  plateBadgeForeign: {
    borderColor: '#333',
    backgroundColor: '#f5f5f5',
  },
  plateText: { fontSize: 20, fontWeight: 'bold', letterSpacing: 2, color: '#111' },
  plateSubText: { fontSize: 12, color: '#8B0000' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: { color: '#888', fontSize: 14 },
  infoValue: { color: '#222', fontSize: 14, fontWeight: '500' },
  homeBtn: {
    marginHorizontal: 16,
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  homeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  addAnotherBtn: {
    marginHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
  },
  addAnotherText: { color: '#8B0000', fontWeight: '600', fontSize: 15 },
});