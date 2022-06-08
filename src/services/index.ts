import TokenService from './token';
import UserService from './user';
import WallpaperService from './wallpaper';

export default {
  token: new TokenService(),
  user: new UserService(),
  wallpaper: new WallpaperService(),
};
