import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
  ScrollView  // ← Ajouté
} from 'react-native';
import { loginKeycloak, requestOTP } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('test@renault.com');      // Pré-rempli
  const [password, setPassword] = useState('Test123!');     // Pré-rempli
  const [phone, setPhone] = useState('+21699191055');             // Pré-rempli
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');  // ← Pour afficher l'erreur

  const handleLogin = async () => {
    // Reset
    setErrorMsg('');
    
    if (!email || !password || !phone) {
      setErrorMsg('Remplis tous les champs');
      return;
    }

    setLoading(true);
    try {
      console.log('=== DÉBUT LOGIN ===');
      console.log('Email:', email);
      console.log('Phone:', phone);

      // 1. LOGIN KEYCLOAK
      console.log('1. Appel Keycloak...');
      const keycloakData = await loginKeycloak(email, password);
      console.log('2. Token reçu:', keycloakData.access_token ? 'OUI' : 'NON');

      // 2. ENVOYER OTP
      console.log('3. Appel OTP...');
      await requestOTP(phone);
      console.log('4. OTP envoyé');

      // 3. NAVIGUER
      console.log('5. Navigation vers OTP...');
      navigation.navigate('OTP', { 
        phoneNumber: phone,
        email: email 
      });
      console.log('=== FIN LOGIN ===');

    } catch (error) {
      console.log('=== ERREUR ===');
      console.log(error);
      setErrorMsg(error.message || 'Erreur inconnue');
      Alert.alert('Erreur', error.message || 'Login échoué');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🚗</Text>
          <Text style={styles.title}>Renault Services</Text>
          
          {/* === AFFICHER L'ERREUR === */}
          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>❌ {errorMsg}</Text>
            </View>
          ) : null}

          {/* === EMAIL === */}
          <View style={styles.field}>
            <Text style={styles.label}>📧 EMAIL (Keycloak)</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* === PASSWORD === */}
          <View style={styles.field}>
            <Text style={styles.label}>🔒 MOT DE PASSE</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* === TÉLÉPHONE === */}
          <View style={styles.field}>
            <Text style={styles.label}>📱 TÉLÉPHONE (OTP)</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* === BOUTON === */}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>SE CONNECTER</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { 
    flexGrow: 1,  // ← Important pour ScrollView
    justifyContent: 'center',
    padding: 20 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
  },
  emoji: { fontSize: 50, textAlign: 'center', marginBottom: 10 },
  title: { 
    fontSize: 24, fontWeight: 'bold', textAlign: 'center',
    color: '#8B0000', marginBottom: 20
  },
  errorBox: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#c62828'
  },
  errorText: { color: '#c62828', fontSize: 14 },
  field: { marginBottom: 18 },
  label: { 
    fontSize: 12, color: '#8B0000', fontWeight: 'bold',
    marginBottom: 6
  },
  input: {
    borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 12,
    paddingHorizontal: 15, paddingVertical: 12,
    fontSize: 16, color: '#333', backgroundColor: '#fafafa'
  },
  button: {
    backgroundColor: '#8B0000', borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 10
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { 
    color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1
  }
});