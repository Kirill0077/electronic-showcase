import HomePage from '@/pages/home'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('@/pages/basket')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/pages/sign-in')
  }
]