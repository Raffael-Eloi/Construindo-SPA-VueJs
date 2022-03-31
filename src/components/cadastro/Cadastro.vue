<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
          <input name="titulo" id="titulo" autocomplete="off" 
          v-model="foto.titulo">
      </div>

      <!--
        ANTES 
        @input="foto.titulo = $event.target.value"
        :value="foto.titulo"

        DEPOIS
        v-model="foto.titulo"
        O v-model já faz todo o código acima de uma vez 
      -->

      <!-- 
        @ -> vai da view para a aplicação
        : -> vai da aplicação para a view
        Nesse caso vira um data biding bidirecional
      -->

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" 
        v-model.lazy="foto.url">
        <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-show="foto.url"/>
      </div>

      <!--
        o modificador .lazy só faz a mudança quando o foto vai para outro campo
        caso contrário teria que ficar procurando uma imagem a cada caractere digitado

        __

        v-show só vai exibir quando tiver algum valor na URL
      -->

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" 
        v-model="foto.descricao">
        </textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id // podemos usar o $route porque estamos usando o vue router
    }
  },

  methods: {
    limpaDados() {
      this.foto = new Foto();
    },

    grava() {
      // event.preventDefault(); não precisa fazer isso se colocar o .prevent no submit
      // console.log(this.foto);
      // O this tem acesso a todas as propriedades retonadas no data() 

      // console.log('enviar dados para a API');
      // this.limpaDados();

      // this.$http
      //   .post('v1/fotos', this.foto)
      //   .then(() => this.foto = new Foto(), err => console.log(err));
      // }

      this.service
      .cadastra(this.foto)
      .then(() => {
        if (this.id) this.$router.push({name: 'home'}) // route (pegar os params) != router (navegação do sistema)
        this.foto = new Foto()
      }, err => console.log(err))
    }
  },
  created() {
    // this.resource = this.$resource('v1/fotos{/id}');
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.busca(this.id)
      .then(foto => this.foto = foto);
    }
  }
}
</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>