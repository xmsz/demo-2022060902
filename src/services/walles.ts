import request from '../libs/request';

export default class WallesService {
  async list(page = 0, pageSize = 10) {
    const res = await request.get<{
      data: IPage<{ title: string; url: string }>;
    }>(
      'https://walles-6gtx8pc7c217c2e1-1253987267.ap-guangzhou.app.tcloudbase.com/container-walles/api/wall/list',
      {
        params: {
          page,
          page_size: pageSize,
        },
      }
    );
    return res.data.data;
  }
}
