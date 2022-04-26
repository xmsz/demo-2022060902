import request from '../libs/request';
import { IDesktopItem } from '../models/desktop';

export default class DesktopService {
  async default() {
    const res = await request.post<IDesktopItem>('/api/desktop/default');
    return res.data;
  }

  async detail(id: IDesktopItem['id']) {
    const res = await request.post<IDesktopItem>('/api/desktop/info', {
      id,
    });
    return res.data;
  }

  async list() {
    const res = await request.post<{ list: IDesktopItem[] }>(
      '/api/desktop/list'
    );
    return res.data.list;
  }

  async create() {
    const res = await request.post<IDesktopItem>('/api/desktop/create');
    return res.data;
  }

  async select(id: IDesktopItem['id']) {
    const res = await request.post('/api/desktop/select', {
      id,
    });
    return res.data;
  }

  async delete(id: string) {
    const res = await request.post('/api/desktop/delete', {
      id,
    });
    return res.data;
  }
}
