import Home from '@/view/home/index.vue'

export default [
  { 
    path: '/',
    component: Home,
    redirect: '/note',
    children: [
      {
        path: 'note',
        component: () => import('@/view/note/index.vue')
      },
      {
        path: 'create-note',
        component: () => import('@/view/createNote/index.vue')
      }
    ]
  }
]