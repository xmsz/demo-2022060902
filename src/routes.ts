import { IRouterConfig, lazy } from 'ice';

const Home = lazy(() => import('@/pages/Home'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    children: [
      {
        path: '/',
        component: Home,
      },
    ],
  },
];

export default routerConfig;
