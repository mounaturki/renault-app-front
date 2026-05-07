import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VehicleInfoScreen({ navigation, route }) {
  const scanResult = route?.params?.scanResult || {};
  const plateType = route?.params?.plateType || 'tunisian';

  const vehicle = scanResult?.vehicleInfo || {};

  const [form, setForm] = useState({
    plateNumber: scanResult?.plateNumber || '',
    ownerName: vehicle?.ownerName || '',
    vehicleBrand: vehicle?.vehicleBrand || 'Renault',
    vehicleModel: vehicle?.vehicleModel || '',
    vehicleYear: vehicle?.vehicleYear?.toString() || '',
    vehicleColor: vehicle?.vehicleColor || '',
    vinNumber: vehicle?.vinNumber || '',
    horsepower: vehicle?.horsepower?.toString() || '',
    fuelType: vehicle?.fuelType || '',
    kilometrage: '',
  });

  const isRegistered = scanResult?.isRegistered;

  const Field = ({ label, value, field, editable = true }) => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, !editable && styles.fieldInputDisabled]}
        value={value}
        editable={editable}
        onChangeText={(t) => setForm({ ...form, [field]: t })}
        placeholderTextColor="#bbb"
        placeholder="—"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.carEmoji}>🚗</Text>
          <View>
            <Text style={styles.brand}>
              {form.vehicleBrand} {form.vehicleModel}
            </Text>
            <Text style={styles.year}>
              {form.vehicleYear} • {form.fuelType}
            </Text>
          </View>
        </View>

        <View style={styles.plateBadge}>
          {plateType === 'tunisian' ? (
            <View style={styles.tunisianPlate}>
              <Text style={styles.plateText}>{form.plateNumber}</Text>
              <Text style={styles.plateTN}>🇹🇳 Tunisie</Text>
            </View>
          ) : (
            <View style={styles.foreignPlate}>
              <Text style={styles.plateText}>{form.plateNumber}</Text>
            </View>
          )}
        </View>

        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Text style={styles.registeredText}>
              ⚠️ Véhicule déjà enregistré — les informations sont pré-remplies
            </Text>
          </View>
        )}

        <View style={styles.confidenceRow}>
          <Text style={styles.confidenceLabel}>Confiance OCR</Text>

          <View style={styles.confidenceBar}>
            <View
              style={[
                styles.confidenceFill,
                { width: `${scanResult?.confidence || 0}%` },
              ]}
            />
          </View>

          <Text style={styles.confidenceValue}>
            {Math.round(scanResult?.confidence || 0)}%
          </Text>
        </View>

        <View style={styles.tabs}>
          {['Clio', 'Megane', 'Duster', 'Captur'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.tab,
                form.vehicleModel === m && styles.tabActive,
              ]}
              onPress={() => setForm({ ...form, vehicleModel: m })}
            >
              <Text
                style={[
                  styles.tabText,
                  form.vehicleModel === m && styles.tabTextActive,
                ]}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>INFORMATIONS VÉHICULE</Text>

          <Field
            label="NUMÉRO DE PLAQUE"
            value={form.plateNumber}
            field="plateNumber"
          />

          <Field
            label="COULEUR"
            value={form.vehicleColor}
            field="vehicleColor"
          />

          <Field
            label="PUISSANCE FISCALE"
            value={form.horsepower}
            field="horsepower"
          />

          <Field
            label="CARBURANT"
            value={form.fuelType}
            field="fuelType"
          />

          <Field
            label="ANNÉE"
            value={form.vehicleYear}
            field="vehicleYear"
          />

          <Field
            label="KILOMÉTRAGE"
            value={form.kilometrage}
            field="kilometrage"
          />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>NUMÉRO VIN</Text>

          <Field
            label="VIN"
            value={form.vinNumber}
            field="vinNumber"
          />
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() =>
            navigation.navigate('Confirmation', { form, plateType })
          }
        >
          <Text style={styles.nextBtnText}>SUIVANT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#8B0000',
    padding: 20,
  },

  carEmoji: {
    fontSize: 50,
  },

  brand: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  year: {
    color: '#ffcdd2',
    fontSize: 13,
  },

  plateBadge: {
    alignItems: 'center',
    paddingVertical: 16,
  },

  tunisianPlate: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8B0000',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },

  foreignPlate: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },

  plateText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#111',
  },

  plateTN: {
    fontSize: 13,
    color: '#8B0000',
  },

  registeredBadge: {
    marginHorizontal: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  registeredText: {
    color: '#856404',
    fontSize: 13,
  },

  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },

  confidenceLabel: {
    fontSize: 12,
    color: '#666',
    width: 80,
  },

  confidenceBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    overflow: 'hidden',
  },

  confidenceFill: {
    height: 6,
    backgroundColor: '#8B0000',
    borderRadius: 3,
  },

  confidenceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B0000',
    width: 36,
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },

  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },

  tabActive: {
    backgroundColor: '#8B0000',
    borderColor: '#8B0000',
  },

  tabText: {
    fontSize: 13,
    color: '#555',
  },

  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  formCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },

  formTitle: {
    fontSize: 11,
    color: '#8B0000',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },

  field: {
    marginBottom: 12,
  },

  fieldLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  fieldInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 6,
    fontSize: 15,
    color: '#222',
  },

  fieldInputDisabled: {
    color: '#999',
  },

  nextBtn: {
    margin: 16,
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },

  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});