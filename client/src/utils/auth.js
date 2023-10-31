import decode from 'jwt-decode';

class AuthService {
  // Define the key used to store the token in local storage
  tokenKey = 'id_token';

  // Get user data
  getProfile() {
    const token = this.getToken();
    if (token) {
      return decode(token);
    }
    return null;
  }

  // Check if user's logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error('Failed to decode token', err);
      return true;
    }
  }

  // Get token from local storage
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Save token to local storage
  setToken(idToken) {
    localStorage.setItem(this.tokenKey, idToken);
  }

  // Remove token from local storage
  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // Helper method to navigate to home page
  navigateToHomePage() {
    window.location.assign('/');
  }
}

const authService = new AuthService();
export default authService;
