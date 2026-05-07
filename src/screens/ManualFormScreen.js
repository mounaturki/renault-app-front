import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FUEL_TYPES = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const COLORS = ['Gris Titanium', 'Blanc', 'Noir', 'Rouge', 'Bleu', 'Autre'];

export default function ManualFormScreen({ navigation, route }) {
const plateType = route?.params?.plateType || 'tunisian';


  const [selectedType, setSelectedType] = useState(plateType || 'tunisian');
  const [form, setForm] = useState({
    plateNumber: '',
    vehicleBrand: 'Renault',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vinNumber: '',
    horsepower: '',
    fuelType: '',
    kilometrage: '',
    ownerName: '',
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const Field = ({ label, field, placeholder, keyboardType = 'default' }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={form[field]}
        onChangeText={(t) => update(field, t)}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Plate type selector */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeBtn,
                selectedType === 'tunisian' && styles.typeBtnActive,
              ]}
              onPress={() => setSelectedType('tunisian')}
            >
              <Text style={styles.typeFlag}>🇹🇳</Text>
              <Text
                style={[
                  styles.typeBtnText,
                  selectedType === 'tunisian' && styles.typeBtnTextActive,
                ]}
              >
                Tunisien
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeBtn,
                selectedType === 'foreign' && styles.typeBtnActive,
              ]}
              onPress={() => setSelectedType('foreign')}
            >
              <Text style={styles.typeFlag}>🌍</Text>
              <Text
                style={[
                  styles.typeBtnText,
                  selectedType === 'foreign' && styles.typeBtnTextActive,
                ]}
              >
                Étranger
              </Text>
            </TouchableOpacity>
          </View>

          {/* Plate number */}
          <View style={styles.plateSection}>
            <Text style={styles.sectionTitle}>NUMÉRO DE PLAQUE</Text>
            <View style={styles.plateInputWrapper}>
              <Text style={styles.plateFlag}>
                {selectedType === 'tunisian' ? '🇹🇳' : '🌍'}
              </Text>
              <TextInput
                style={styles.plateInput}
                value={form.plateNumber}
                onChangeText={(t) => update('plateNumber', t.toUpperCase())}
                placeholder={selectedType === 'tunisian' ? '199 TN 01' : 'AB-123-CD'}
                placeholderTextColor="#bbb"
                autoCapitalize="characters"
              />
              {form.plateNumber.length > 3 && (
                <View style={styles.validBadge}>
                  <Text style={styles.validText}>✓ Valide</Text>
                </View>
              )}
            </View>
          </View>

          {/* Vehicle info */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>MODÈLE RENAULT</Text>
            <View style={styles.modelGrid}>
              {['Clio 5', 'Megane', 'Duster', 'Captur', 'Zoe', 'Autre'].map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.modelBtn,
                    form.vehicleModel === m && styles.modelBtnActive,
                  ]}
                  onPress={() => update('vehicleModel', m)}
                >
                  <Text
                    style={[
                      styles.modelBtnText,
                      form.vehicleModel === m && styles.modelBtnTextActive,
                    ]}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>INFORMATIONS VÉHICULE</Text>
            <Field label="Couleur" field="vehicleColor" placeholder="Gris Titanium" />
            <Field label="Numéro de plaque" field="plateNumber" placeholder="—" />
            <Field label="Puissance fiscale" field="horsepower" placeholder="ex: 5" keyboardType="numeric" />
            <Field label="Carburant" field="fuelType" placeholder="Essence / Diesel" />
            <Field label="Année" field="vehicleYear" placeholder="2022" keyboardType="numeric" />
            <Field label="Kilométrage" field="kilometrage" placeholder="48 000 km" keyboardType="numeric" />

            {/* Fuel type chips */}
            <View style={styles.chipsRow}>
              {FUEL_TYPES.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[
                    styles.chip,
                    form.fuelType === f && styles.chipActive,
                  ]}
                  onPress={() => update('fuelType', f)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      form.fuelType === f && styles.chipTextActive,
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>NUMÉRO VIN</Text>
            <Field
              label="VIN"
              field="vinNumber"
              placeholder="VF1AB000213456789"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitBtn,
              !form.plateNumber && styles.submitBtnDisabled,
            ]}
            disabled={!form.plateNumber}
            onPress={() =>
              navigation.navigate('Confirmation', {
                form: { ...form, plateType: selectedType },
                plateType: selectedType,
              })
            }
          >
            <Text style={styles.submitBtnText}>SOUMETTRE</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  typeSelector: {
    flexDirection: 'row',
    margin: 16,
    gap: 12,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  typeBtnActive: { borderColor: '#8B0000', backgroundColor: '#fff5f5' },
  typeFlag: { fontSize: 20 },
  typeBtnText: { fontSize: 15, color: '#555', fontWeight: '500' },
  typeBtnTextActive: { color: '#8B0000', fontWeight: 'bold' },
  plateSection: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 11,
    color: '#8B0000',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  plateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B0000',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    backgroundColor: '#fff',
  },
  plateFlag: { fontSize: 22 },
  plateInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#111',
  },
  validBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  validText: { color: '#2e7d32', fontSize: 12, fontWeight: '600' },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  modelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  modelBtnActive: { backgroundColor: '#8B0000', borderColor: '#8B0000' },
  modelBtnText: { color: '#555', fontSize: 13 },
  modelBtnTextActive: { color: '#fff', fontWeight: '600' },
  field: { marginBottom: 14 },
  label: { fontSize: 11, color: '#888', marginBottom: 4, letterSpacing: 0.5 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 6,
    fontSize: 15,
    color: '#222',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  chipActive: { backgroundColor: '#8B0000', borderColor: '#8B0000' },
  chipText: { fontSize: 12, color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  submitBtn: {
    margin: 16,
    marginBottom: 30,
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#ccc' },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});