export const authService = {
  // Ahora recibe el email, rol y el token real de tu backend
  login: (email: string, role: string, token: string) => {
    const userData = { email, role, token };
    localStorage.setItem('session', JSON.stringify(userData));
  },
  
  logout: () => {
    localStorage.removeItem('session');
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem('session') !== null;
  },
  
  getRole: (): string | null => {
    const session = localStorage.getItem('session');
    if (session) {
      const { role } = JSON.parse(session);
      return role;
    }
    return null;
  }
};