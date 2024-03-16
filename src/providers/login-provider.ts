class LoginProvider {
  setToken(userId: string) {
    const tokenText = `${Math.random().toString(36).substring(7)}-${userId}`;
    sessionStorage.setItem("token", tokenText);
  }

  getUserId() {
    const token = sessionStorage.getItem("token");
    const userId = token?.split("-")[1];
    return userId;
  }

  removeToken() {
    sessionStorage.removeItem("token");
  }
}

export const loginProvider = new LoginProvider();
