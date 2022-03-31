<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input
      type="text"
      class="filtro"
      placeholder="filtre por parte do título"
      v-on:input="filtro = $event.target.value"
    />
    <!-- {{ filtro }} -->
    <!-- interpolação/data biding unidirecional -->
    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto of fotosComFiltro"
        :key="foto.titulo"
      >
        <meu-painel :titulo="foto.titulo">
          <!-- na diretiva : -> argumento -->
          <!-- na diretiva . -> modificador -->
          <imagem-responsiva
            v-meu-transform:scale.animate="1.1"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <router-link :to="{name: 'altera', params: { id: foto._id}}">
            <meu-botao
              tipo="button"
              rotulo="ALTERAR"
            />
          </router-link>
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
import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        /* filtrar */
        let exp = new RegExp(this.filtro.trim(), "i"); // trim remove os espaços
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  methods: {
    remove(foto) {

      this.service.apaga(foto._id)
      .then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso"
        },
        err => {
          this.mensagem = err.message;
        });

      // this.resource
      // .delete({ id: foto._id })
      // .then(
      //   () => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso"
      //   },
      //   err => {
      //     this.mensagem = "Não foi possível remover a foto";
      //     console.log(err)
      //   });

      // this.$http
      // .delete(`v1/fotos/${foto._id}`)
      // .then(
      //   () => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso"
      //   },
      //   err => {
      //     this.mensagem = "Não foi possível remover a foto";
      //     console.log(err)
      //   });

      /* 
        O then recebe duas funções f1 e f2
        f1 -> Se a função foi executada corretamente 
        f2 -> Se a função NÃO foi executada corretamente (algum problema ocorreu) 
      */
    }
  },

  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  directives: {
    'meu-transform': transform
  },

  created() {
    // alert("Criei o componente");
    //this.$http só existe porque importamos o resource e dentro dele tem alguns métodos que podemos usar
    // let promise = this.$http.get("http://localhost:3000/v1/fotos");
    // devolve uma promessa porque o endereço pode estar errado, a internet pode ter caído ou oscilado
    // promise.then((res) => res.json()).then((fotos) => (this.fotos = fotos));

    // this.$http
    //   .get("v1/fotos")
    //   .then(res => res.json())
    //   .then(
    //     fotos => (this.fotos = fotos),
    //     err => console.log(err)
    //   );
    //this.fotos é a propriedado do objeto - é o array definido acima

    // this.resource = this.$resource('v1/fotos{/id}');
    // this.resource
    // .query()
    // .then(res => res.json())
    // .then(
    //   fotos => (this.fotos = fotos),
    //   err => console.log(err)
    // );
    // A notação this.resource = this.$resource('v1/fotos') cria dinamicamente um atributo
    // A diferença é que o resource com o query() já retorna uma consulta

    this.service  = new FotoService(this.$resource);
    
    this.service
    .lista()
    .then(fotos => (this.fotos = fotos), err => this.mensagem = err.message);
  }
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
