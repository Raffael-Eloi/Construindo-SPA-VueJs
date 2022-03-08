import Home from './components/home/Home.vue';
import Cadastro from './components/cadastro/Cadastro.vue';
import Vue from 'vue';

// dentro de routes tem que estar as configurações das rotas
export const routes = [
  { path: '', component: Home, titulo: 'Home'},
  { path: '/cadastro', component: Cadastro, titulo: 'Cadastro'},

]; 
/* Rota é um objeto javascript com duas propriedades */