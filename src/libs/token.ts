import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from './utils';

const tokenKey = 'access_token';

export default class TokenHelper {
  token = '';

  async initToken() {
    if (this.token) return;

    let token = '';
    const tokenSource = [this.getTokenFromLocalstorage];
    for (let i = 0, len = tokenSource.length; i < len; i += 1) {
      token = (await tokenSource[i].call(this)) ?? '';
      if (token) break;
    }
    this.saveToken(token);
  }

  saveToken(token: string) {
    if (!token) return;
    this.token = token;
    setLocalStorageItem(tokenKey, token);
  }

  clearToken() {
    this.token = '';
    removeLocalStorageItem(tokenKey);
  }

  private getTokenFromLocalstorage() {
    return getLocalStorageItem(tokenKey) ?? '';
  }
}

export const tokenHelper = new TokenHelper();
