import { IResponse } from '@/interface';
import request from '@/libs/request';

export default class TokenService {
  async get(payload: { username: string; password: string }) {
    const res = await request.post<IResponse<{ token: string }>>('/api/login', payload);
    return res.data;
  }
}
