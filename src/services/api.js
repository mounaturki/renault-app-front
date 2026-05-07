import axios from 'axios';

// ⚠️ Remplace par l'IP de ton PC (pas localhost sur Android)
// Sur émulateur Android : 10.0.2.2
// Sur téléphone physique : ton IP local ex: 192.168.1.X
const BASE_URL = 'http://20.20.1.3:8085/api';
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'multipart/form-data' },
});

// Scanner une plaque via image
export const scanPlate = async (imageUri, type) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'plate.jpg',
    });

    const response = await api.post(`/ocr/scan/${type}`, formData);
    return response.data;
  } catch (error) {
    console.error('Erreur scan:', error);
    throw error;
  }
};

// Vérifier une plaque par numéro
export const checkPlate = async (plateNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/ocr/check/${plateNumber}`);
    return response.data;
  } catch (error) {
    console.error('Erreur check plaque:', error);
    throw error;
  }
};