import { IRouterConfig, lazy } from 'ice';
import Basic from './layouts/Basic';

const Home = lazy(() => import('@/pages/Home'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Basic,
    children: [
      {
        path: '/',
        component: Home,
      },
    ],
  },
];

export default routerConfig;
