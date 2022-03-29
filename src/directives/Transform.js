import Vue from "vue";

// Vue.directive("meu-transform", {
// hook/gancho que é chamado toda vez que a diretiva se prende/é associado a um elemento do DOM
export default {
  bind(el, binding, vnode) {
    /* el -> referência ao elemento do DOM na qual a diretiva foi associada */
    /* binding -> permite pegar o valor passado para diretiva */
    /* vnode -> É uma referência para o Virtual DOM ultilizado pelo vue. Ele permite acessar propriedades do Componente na qual ela foi associada */
    // console.log("diretiva associada");
    // console.log(el);
    // console.log(binding);
    // console.log(vnode);

    let current = 0;

    el.addEventListener("dblclick", () => {
      let incremento = binding.value || 90;
      let efeito;
      /*
       * Uma diretiva pode suportar zero ou mais argumentos e eles servem para ditar a lógica * principal da diretiva que deve ser executada.
       * Já os modificadores podem ser usados pelos argumentos para que ativem ou nã determinada lógica.
       */
      if (!binding.arg || binding.arg === "rotate") {
        if (binding.modifiers.reverse) {
          current -= incremento;
        } else {
          current += incremento;
        }
        efeito = `rotate(${current}deg)`;
      } else if (binding.arg === "scale") {
        efeito = `scale(${incremento})`;
      }
      el.style.transform = efeito;
      if (binding.modifiers.animate) el.style.transition = "transform 0.5s";
    });
  }
};

/*
 * Primeiro parâmetro: nome
 * Segundo parâmetro: função
 *
 * Para usar -> v-name
 * Para usar neste caso -> v-meu-transform
 */

//https://vuejs.org/examples/#attribute-bindings
