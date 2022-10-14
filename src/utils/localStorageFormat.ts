export function setLocalStorage(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}

export function removeItemLocalStorage(key: string) {
  return window.localStorage.removeItem(key);
}
export function clearLocalStorage() {
  return window.localStorage.clear();
}
