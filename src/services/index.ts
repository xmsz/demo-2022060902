import DesktopService from './desktop';
import UserServices from './user';
import WallesService from './walles';

export default {
  desktop: new DesktopService(),
  user: new UserServices(),
  walles: new WallesService(),
};
