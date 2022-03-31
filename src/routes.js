import Home from "./components/home/Home.vue";
// import Cadastro from "./components/cadastro/Cadastro.vue";

const Cadastro = () => System.import("./components/cadastro/Cadastro.vue");
// Para fazer splitting e lazy loading (sem uso do webpack)

// dentro de routes tem que estar as configurações das rotas
export const routes = [
  { path: "", name: "home", component: Home, titulo: "Home", menu: true },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
    titulo: "Cadastro",
    menu: true
  },
  {
    path: "/cadastro/:id",
    name: "altera",
    component: Cadastro,
    titulo: "Cadastro",
    menu: false
  },
  { path: "*", component: Home, menu: false }
];
/* Rota é um objeto javascript com duas propriedades */
