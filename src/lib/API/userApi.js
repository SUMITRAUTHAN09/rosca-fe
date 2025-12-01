import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rosca-be.vercel.app/api';

console.log('🔗 User API Base URL:', API_BASE_URL);

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Create axios instance with auth headers for protected routes
const createAuthInstance = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

/**
 * Signup new user - public endpoint
 */
export const signupUser = async (userData) => {
  try {
    console.log('📝 Signing up user:', userData.email);
    const response = await axios.post(`${API_BASE_URL}/users/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ Signup successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Signup error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

/**
 * Login user - public endpoint
 */
export const loginUser = async (credentials) => {
  try {
    console.log('🔐 Logging in user:', credentials.email);
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ Login successful');
    return response.data;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

/**
 * Get current user info - protected endpoint
 */
export const getCurrentUserInfo = async () => {
  try {
    console.log('🔍 Fetching current user info...');
    const instance = createAuthInstance();
    const response = await instance.get('/users/me');
    console.log('✅ User info fetched:', response.data.user);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user info:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user info');
  }
};

/**
 * Get user's rooms - protected endpoint (HOST PROFILE)
 */
export const getUserRooms = async () => {
  try {
    console.log('🏠 Fetching user rooms...');
    const instance = createAuthInstance();
    const response = await instance.get('/rooms/user/my-rooms');
    console.log('✅ User rooms fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user rooms:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user rooms');
  }
};

/**
 * Upload profile picture - protected endpoint
 */
export const uploadProfilePicture = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    console.log('📤 Uploading profile picture...', file.name);
    const formData = new FormData();
    formData.append('profilePicture', file);

    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      `${API_BASE_URL}/users/upload-profile-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('✅ Profile picture uploaded successfully:', response.data);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('authToken', response.data.token || token);
    }

    return response.data;
  } catch (error) {
    console.error('❌ Error uploading profile picture:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload profile picture');
  }
};

/**
 * Update user type (host/user) - protected endpoint
 */
export const updateUserType = async (userType) => {
  try {
    if (!['host', 'user'].includes(userType)) {
      throw new Error('Invalid user type');
    }

    console.log('🔄 Updating user type to:', userType);

    const instance = createAuthInstance();
    const response = await instance.patch('/users/update-user-type', { userType });

    console.log('✅ User type updated:', response.data);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('❌ Error updating user type:', error);
    throw new Error(error.response?.data?.message || 'Failed to update user type');
  }
};

/**
 * Logout user - client-side only
 */
export const logoutUser = async () => {
  try {
    console.log('👋 Logging out user...');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userLoggedIn');
      console.log('✅ User logged out successfully');
    }
    return { success: true };
  } catch (error) {
    console.error('❌ Error during logout:', error);
    throw error;
  }
};
/**
 * Get single room by ID - VIEW button
 */
export const getRoomById = async (roomId) => {
  try {
    console.log('🔍 Fetching room by ID:', roomId);
    const instance = createAuthInstance();
    const response = await instance.get(`/rooms/${roomId}`);
    console.log('✅ Room fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching room:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch room');
  }
};

/**
 * Update room - EDIT button  
 */
export const updateRoom = async (roomId, roomData) => {
  try {
    console.log('✏️ Updating room:', roomId);
    const instance = createAuthInstance();
    const response = await instance.put(`/rooms/${roomId}`, roomData);
    console.log('✅ Room updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating room:', error);
    throw new Error(error.response?.data?.message || 'Failed to update room');
  }
};

/**
 * Delete room - DELETE button (if needed)
 */
export const deleteRoom = async (roomId) => {
  try {
    console.log('🗑️ Deleting room:', roomId);
    const instance = createAuthInstance();
    const response = await instance.delete(`/rooms/${roomId}`);
    console.log('✅ Room deleted');
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting room:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete room');
  }
};
