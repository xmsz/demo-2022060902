import request from '@/libs/request';

export default class UserService {
  async add(payload: { username: string; password: string }) {
    const res = await request.post('/api/user/add', payload);
    return res.data;
  }
}
