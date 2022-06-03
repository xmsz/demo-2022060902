import { runApp, IAppConfig } from 'ice';
import 'uno.css';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
};

runApp(appConfig);
