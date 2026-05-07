import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { scanPlate } from '../services/api';

export default function ScannerScreen({ navigation, route }) {
  const { plateType } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permContainer}>
        <Text style={styles.permText}>
          Accès à la caméra requis pour scanner la plaque
        </Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current || scanning) return;
    setScanning(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        base64: false,
      });
      const result = await scanPlate(photo.uri, plateType);
      if (result.success) {
        navigation.navigate('VehicleInfo', { scanResult: result, plateType });
      } else {
        Alert.alert(
          'Plaque non reconnue',
          result.error || 'Réessayez avec une meilleure image.',
          [{ text: 'Réessayer', onPress: () => setScanning(false) }]
        );
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur.');
      setScanning(false);
    }
  };

  const handleGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setScanning(true);
      try {
        const scanResult = await scanPlate(result.assets[0].uri, plateType);
        if (scanResult.success) {
          navigation.navigate('VehicleInfo', { scanResult, plateType });
        } else {
          Alert.alert('Non reconnu', scanResult.error);
          setScanning(false);
        }
      } catch {
        Alert.alert('Erreur serveur');
        setScanning(false);
      }
    }
  };

  return (
    <View style={styles.container}>

      {/* ✅ CameraView SANS enfants */}
      <CameraView style={styles.camera} ref={cameraRef} facing="back" />

      {/* ✅ Overlay EN DEHORS de CameraView */}
      <View style={styles.overlayContainer}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            <View style={styles.plateArea}>
              <Text style={styles.plateAreaLabel}>
                {plateType === 'tunisian' ? '🇹🇳 Tunisien' : '🌍 Étranger'}
              </Text>
            </View>
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay}>
          <Text style={styles.hint}>Centrez la plaque dans le cadre</Text>
        </View>
      </View>

      {/* Boutons */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.galleryBtn} onPress={handleGallery}>
          <Text style={styles.galleryText}>📁 Galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={handleCapture}
          disabled={scanning}
        >
          {scanning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.captureInner} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.manualBtn}
          onPress={() => navigation.navigate('ManualForm', { plateType })}
        >
          <Text style={styles.manualText}>✏️ Manuel</Text>
        </TouchableOpacity>
      </View>

      {scanning && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#8B0000" />
          <Text style={styles.loadingText}>Analyse en cours...</Text>
        </View>
      )}
    </View>
  );
}

const FRAME_W = 280;
const FRAME_H = 100;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  // ✅ Camera prend tout l'écran
  camera: {
    ...StyleSheet.absoluteFillObject,
  },

  // ✅ Overlay par-dessus la caméra
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 110,
  },

  topOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  middleRow: { flexDirection: 'row', height: FRAME_H + 40 },
  sideOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  scanFrame: {
    width: FRAME_W,
    height: FRAME_H + 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#8B0000',
    borderWidth: 3,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  plateArea: {
    width: FRAME_W - 20,
    height: FRAME_H,
    borderRadius: 8,
    backgroundColor: 'rgba(139,0,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plateAreaLabel: { color: '#fff', fontSize: 13, opacity: 0.8 },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    paddingTop: 16,
  },
  hint: { color: '#fff', fontSize: 13, opacity: 0.8 },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: 110,
  },
  galleryBtn: { alignItems: 'center' },
  galleryText: { color: '#fff', fontSize: 12, marginTop: 4 },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  manualBtn: { alignItems: 'center' },
  manualText: { color: '#fff', fontSize: 12, marginTop: 4 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { color: '#fff', marginTop: 12, fontSize: 16 },
  permContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  permText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  permBtn: {
    backgroundColor: '#8B0000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  permBtnText: { color: '#fff', fontWeight: 'bold' },
});