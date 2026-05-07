import axios from 'axios';

const BASE_URL = 'http://192.168.1.75:8085/api';
const KEYCLOAK_URL = 'http://192.168.1.75:8080';

// ================= KEYCLOAK LOGIN =================
export const loginKeycloak = async (username, password) => {
  try {
    const params = new URLSearchParams();

    params.append('grant_type', 'password');
    params.append('client_id', 'renault-app');
    params.append('client_secret', 'FoU1knP7zmuL6ioZfkiScX7SCicZxQVg');
    params.append('username', username);
    params.append('password', password);

    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/renault-realm/protocol/openid-connect/token`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    console.log('❌ Keycloak error:', error.response?.data || error.message);
    throw new Error('Login échoué');
  }
};

// ================= OTP SMS =================
export const requestOTP = async (phoneNumber) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/otp/send`,
      { phoneNumber },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    console.log('❌ OTP error:', error.response?.data || error.message);
    throw new Error("Impossible d'envoyer l'OTP");
  }
};

export const resendOTP = async (phoneNumber) => {
  return requestOTP(phoneNumber);
};

export const verifyOTP = async (phoneNumber, otpCode) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/otp/verify`,
      { phoneNumber, otpCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    return response.data.access_granted;
  } catch (error) {
    console.log('❌ Verify error:', error.response?.data || error.message);
    throw new Error('Vérification échouée');
  }
};

// ================= OCR SCAN PLAQUE =================
export const scanPlate = async (imageUri, type) => {
  try {
    const formData = new FormData();

    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'plate.jpg',
    });

    const response = await axios.post(
      `${BASE_URL}/ocr/scan/${type}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error) {
    console.log('❌ Erreur scan OCR:', error.response?.data || error.message);
    throw error;
  }
};

// ================= CHECK PLAQUE =================
export const checkPlate = async (plateNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ocr/check/${plateNumber}`,
      {
        timeout: 15000,
      }
    );

    return response.data;
  } catch (error) {
    console.log('❌ Erreur check plaque:', error.response?.data || error.message);
    throw error;
  }
};

// ================= REFRESH TOKEN =================
export const refreshToken = async (refreshTokenValue) => {
  try {
    const params = new URLSearchParams();

    params.append('grant_type', 'refresh_token');
    params.append('client_id', 'renault-app');
    params.append('client_secret', 'FoU1knP7zmuL6ioZfkiScX7SCicZxQVg');
    params.append('refresh_token', refreshTokenValue);

    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/renault-realm/protocol/openid-connect/token`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('❌ Refresh error:', error.response?.data || error.message);
    throw new Error('Refresh token échoué');
  }
};

export const logoutKeycloak = async () => {
  return true;
};