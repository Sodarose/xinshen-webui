import Layout from '@/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: { title: '仪表盘', icon: DashboardIcon },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: { title: '操作页面' },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: { title: '播放设置' },
      },
      {
        path: 'detail',
        name: 'DashboardDetail2',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: { title: '推流配置' },
      },
    ],
  },
];
