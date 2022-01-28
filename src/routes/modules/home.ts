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
      },
      {
        path: 'word/:noteId',
        component: () => import('@/view/word/index.vue')
      },
      {
        path: 'addWord/:noteId',
        component: () => import('@/view/addWord/index.vue')
      },
      {
        path: 'square',
        component: () => import('@/view/square/index.vue')
      },
      {
        path: 'user/:userId',
        component: () => import('@/view/user/index.vue')
      },
      {
        path: 'memory',
        component: () => import('@/view/memory/index.vue')
      },
    ]
  }
]