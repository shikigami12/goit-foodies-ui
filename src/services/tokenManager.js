const JWT_UTILS = {
  decode: (token) => {
    try {
      if (!token) return null;

      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return decoded;
    } catch {
      return null;
    }
  },

  isExpired: (token) => {
    try {
      const decoded = JWT_UTILS.decode(token);
      if (!decoded || !decoded.exp) return true;

      const expirationTime = decoded.exp * 1000;
      return Date.now() >= expirationTime;
    } catch {
      return true;
    }
  },

  getExpiration: (token) => {
    try {
      const decoded = JWT_UTILS.decode(token);
      if (!decoded || !decoded.exp) return null;

      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  },
};

export const tokenManager = {
  getToken: () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      if (JWT_UTILS.isExpired(token)) {
        tokenManager.removeToken();
        return null;
      }

      return token;
    } catch {
      return null;
    }
  },

  setToken: (token) => {
    try {
      if (!token) {
        tokenManager.removeToken();
        return;
      }

      if (JWT_UTILS.isExpired(token)) {
        tokenManager.removeToken();
        return;
      }

      localStorage.setItem('token', token);
    } catch {
      // Silent fail for localStorage errors
    }
  },

  removeToken: () => {
    try {
      localStorage.removeItem('token');
    } catch {
      // Silent fail for localStorage errors
    }
  },

  hasToken: () => {
    try {
      return Boolean(tokenManager.getToken());
    } catch {
      return false;
    }
  },

  getTokenExpiration: () => {
    try {
      const token = localStorage.getItem('token');
      return token ? JWT_UTILS.getExpiration(token) : null;
    } catch {
      return null;
    }
  },
};
