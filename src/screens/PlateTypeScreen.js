import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlateTypeScreen({ navigation }) {
  const handleSelect = (type) => {
    navigation.navigate('Scanner', { plateType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Car illustration */}
      <View style={styles.carContainer}>
        <Text style={styles.carEmoji}>🚗</Text>
      </View>

      <Text style={styles.title}>Vous êtes ?</Text>
      <Text style={styles.subtitle}>
        Choisissez le type de votre plaque d'immatriculation
      </Text>

      {/* Tunisian */}
      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => handleSelect('tunisian')}
      >
        <View style={styles.optionLeft}>
          <Text style={styles.flagEmoji}>🇹🇳</Text>
          <Text style={styles.optionLabel}>Tunisien</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* Foreign */}
      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => handleSelect('foreign')}
      >
        <View style={styles.optionLeft}>
          <Text style={styles.flagEmoji}>🌍</Text>
          <Text style={styles.optionLabel}>Étranger</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* Manual entry */}
      <TouchableOpacity
        style={styles.manualBtn}
        onPress={() => navigation.navigate('ManualForm', { plateType: null })}
      >
        <Text style={styles.manualText}>✏️  Saisie manuelle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueBtnText}>CONTINUER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  carContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 24,
  },
  carEmoji: { fontSize: 80 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    elevation: 1,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  flagEmoji: { fontSize: 28 },
  optionLabel: { fontSize: 18, fontWeight: '600', color: '#222' },
  arrow: { fontSize: 24, color: '#8B0000', fontWeight: 'bold' },
  manualBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  manualText: { color: '#555', fontSize: 15 },
  continueBtn: {
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});