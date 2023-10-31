import { jwtDecode } from 'jwt-decode';

class AuthService {
  // Define the key used to store the token in local storage
  tokenKey = 'id_token';

  // Get user data
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
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
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error('Failed to decode token', err);
      return true;
    }
  }

  setToken(idToken) {
    localStorage.setItem(this.tokenKey, idToken);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
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
