import { jwtDecode } from 'jwt-decode';

class AuthService {
  guestTokenKey = 'guest_token';

  setGuestToken(guestToken) {
    localStorage.setItem(this.guestTokenKey, guestToken);
  }

  getGuestToken() {
    return localStorage.getItem(this.guestTokenKey);
  }

  removeGuestToken() {
    localStorage.removeItem(this.guestTokenKey);
  }

  transferGuestCartToUser() {
    const guestToken = this.getGuestToken();
    if (guestToken) {
      // Transfer cart items from guest to user
      // Update Apollo cache or perform any other necessary actions
      this.removeGuestToken();
    }
  }

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

  // Helper method to navigate to home page
  navigateToHomePage() {
    window.location.assign('/');
  }
}

const authService = new AuthService();
export default authService;
 