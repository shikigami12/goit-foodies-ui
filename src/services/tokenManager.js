const JWT_UTILS = {
  // Decodes JWT token payload
  decode: (token) => {
    try {
      if (!token) return null;
      
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = parts[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return decoded;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  },

  // Checks if JWT token is expired
  isExpired: (token) => {
    try {
      const decoded = JWT_UTILS.decode(token);
      if (!decoded || !decoded.exp) return true;
      
      const expirationTime = decoded.exp * 1000;
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  },

  // Returns token expiration date
  getExpiration: (token) => {
    try {
      const decoded = JWT_UTILS.decode(token);
      if (!decoded || !decoded.exp) return null;
      
      return new Date(decoded.exp * 1000);
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  },
};

export const tokenManager = {
  // Retrieves valid token from localStorage
  getToken: () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      if (JWT_UTILS.isExpired(token)) {
        tokenManager.removeToken();
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  },

  // Stores token in localStorage if valid
  setToken: (token) => {
    try {
      if (!token) {
        tokenManager.removeToken();
        return;
      }
      
      if (JWT_UTILS.isExpired(token)) {
        console.warn('Attempted to store expired token');
        tokenManager.removeToken();
        return;
      }
      
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error setting token in localStorage:', error);
    }
  },

  // Removes token from localStorage
  removeToken: () => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  },

  // Checks if valid token exists
  hasToken: () => {
    try {
      return Boolean(tokenManager.getToken());
    } catch (error) {
      console.error('Error checking token in localStorage:', error);
      return false;
    }
  },

  // Returns token expiration date from localStorage
  getTokenExpiration: () => {
    try {
      const token = localStorage.getItem('token');
      return token ? JWT_UTILS.getExpiration(token) : null;
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  },
};

