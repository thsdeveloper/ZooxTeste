import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EstadosList from "../components/EstadosList";
import CidadesList from "../components/CidadesList";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/estados',
        name: 'Estados',
        component: EstadosList
    },
    {
        path: '/cidades',
        name: 'Cidades',
        component: CidadesList
    },
]

const router = new VueRouter({
    routes
})

export default router