import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import { routes } from "./routes";
import "./directives/Transform";
// // import VeeValidate from "vee-validate";
// import { ValidationProvider, extend } from "vee-validate";
// import { required } from "vee-validate/dist/rules";
// extend("required", { ...required, message: "This field is required" });

Vue.use(VueResource);
Vue.http.options.root = "http://localhost:3000";
Vue.use(VueRouter);

const router = new VueRouter({
  // routes: routes
  // De acordo com o ecma script 2015, propriedade e valor com mesmo nome pode ser reduzido como foi feito abaixo
  routes,
  mode: "history" // para tirar o hash da URL (localhost:8080/#/)
});

// Vue.use(VeeValidate);

// Vue.component("validation-provider", ValidationProvider);

new Vue({
  el: "#app",
  // router: router,
  router,
  render: h => h(App)
});
