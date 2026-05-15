export const AUTH_TOKEN_KEY = "facturo_token";

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
