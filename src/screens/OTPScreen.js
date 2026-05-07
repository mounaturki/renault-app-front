import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verifyOTP, resendOTP } from '../services/api';

export default function OTPScreen({ navigation, route }) {
  const { phoneNumber } = route.params || {};
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text, index) => {
    if (text.length > 1) text = text[0];
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const getFullCode = () => code.join('');

  const handleVerify = async () => {
    const fullCode = getFullCode();
    if (fullCode.length !== 6) {
      Alert.alert('Erreur', 'Veuillez saisir les 6 chiffres');
      return;
    }

    setLoading(true);
    try {
      const isValid = await verifyOTP(phoneNumber, fullCode);

      if (isValid) {
        Alert.alert('✅ Succès', 'Vérification réussie !');
        navigation.replace('Home');
      } else {
        Alert.alert('Erreur', 'Code incorrect ou expiré');
        setCode(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      }
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Impossible de vérifier le code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      await resendOTP(phoneNumber);
      setTimer(60);
      Alert.alert('Envoyé', 'Un nouveau code a été envoyé');
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Impossible de renvoyer le code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shieldEmoji}>🔐</Text>
        <Text style={styles.title}>Vérification</Text>
        <Text style={styles.subtitle}>
          Saisissez le code à 6 chiffres envoyé à{'\n'}
          <Text style={styles.contact}>{phoneNumber}</Text>
        </Text>
      </View>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref}
            style={[
              styles.codeInput,
              digit && styles.codeInputFilled,
              index === 0 && !digit && styles.codeInputActive,
            ]}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        {timer > 0 ? (
          <Text style={styles.timerText}>Renvoi possible dans {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>📤 Renvoyer le code</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.verifyBtn, getFullCode().length !== 6 && styles.verifyBtnDisabled]}
        onPress={handleVerify}
        disabled={getFullCode().length !== 6 || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyBtnText}>VÉRIFIER</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#8B0000',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  shieldEmoji: { fontSize: 50, marginBottom: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#ffcdd2', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  contact: { color: '#fff', fontWeight: '600' },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 40,
    marginHorizontal: 20,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  codeInputFilled: { borderColor: '#8B0000', backgroundColor: '#fff5f5' },
  codeInputActive: { borderColor: '#8B0000' },
  resendContainer: { alignItems: 'center', marginTop: 30 },
  timerText: { color: '#888', fontSize: 14 },
  resendText: { color: '#8B0000', fontSize: 14, fontWeight: '600' },
  verifyBtn: {
    marginHorizontal: 24,
    marginTop: 30,
    backgroundColor: '#8B0000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyBtnDisabled: { backgroundColor: '#ccc' },
  verifyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
});