import request from '../libs/request';
import { IDesktopItem } from '../models/desktop';
import { IUserInfo } from '../models/user';

export default class UserServices {
  async register(user: { account: string; password: string }) {
    const res = await request.post<IDesktopItem>('/api/user/insert', {
      ...user,
    });
    return res.data;
  }
  async login(user: { account: string; password: string }) {
    const res = await request.post('/api/user/login', {
      ...user,
    });
    return res.data;
  }
  async info() {
    const res = await request.post<IUserInfo>('/api/user/info');
    return res.data;
  }
}
