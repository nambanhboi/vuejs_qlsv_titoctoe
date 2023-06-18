import { createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("../components/Home.vue")
    },
    {
        path: '/qlsv',
        name: 'qlsv',
        component: () => import("../components/bai1_qlsv/QlSv.vue")
    },
    {
        path: '/game',
        name: 'game',
        component: () => import("../components/bai2_tictoctoe/Game.vue")
    },
    {
        path: '/qlsv2',
        name: 'qlsv2',
        component: () => import("../components/bai1_qlsv/QlSv2.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;