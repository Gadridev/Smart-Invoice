export const UNAUTHORIZED_EVENT = "facturo:auth-unauthorized";

export function dispatchUnauthorized() {
  window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
}
