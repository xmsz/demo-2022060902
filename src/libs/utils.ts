export function setLocalStorageItem(key: string, value: any) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem(item: string) {
  const result = window.localStorage.getItem(item);
  return result ? JSON.parse(result) : result;
}

export function removeLocalStorageItem(item: string) {
  window.localStorage.removeItem(item);
}

export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    return r.toString(16);
  });
}
