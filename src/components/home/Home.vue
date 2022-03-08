
<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <input
      type="text"
      class="filtro"
      placeholder="filtre por parte do título"
      v-on:input="filtro = $event.target.value"
    />
    {{ filtro }}
    <!-- interpolação/data biding unidirecional -->
    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto of fotosComFiltro"
        :key="foto.titulo"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            :confirmacao="true"
            estilo="perigo"
            @botaoAtivado="remove(foto)"
          />
          <!-- @click.native -> chama o elemento nativo (componente) -->
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";

export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        /* filtrar */
        let exp = new RegExp(this.filtro.trim(), "i"); // trim remove os espaços
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    },
  },

  methods: {
    remove(foto) {
      alert(`Remove a ${foto.titulo}`);
    },
  },

  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },

  created() {
    // alert("Criei o componente");
    //this.$http só existe porque importamos o resource e dentro dele tem alguns métodos que podemos usar
    // let promise = this.$http.get("http://localhost:3000/v1/fotos");
    // devolve uma promessa porque o endereço pode estar errado, a internet pode ter caído ou oscilado
    // promise.then((res) => res.json()).then((fotos) => (this.fotos = fotos));

    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then((res) => res.json())
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );
    //this.fotos é a propriedado do objeto - é o array definido acima
  },
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
