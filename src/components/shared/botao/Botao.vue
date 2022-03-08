<template>
  <button
    @click="disparaAcao()"
    class="botao"
    :class="estiloDoBotao"
    :type="tipo"
  >
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      required: true,
    },
    rotulo: {
      type: String,
      required: true,
    },
    confirmacao: Boolean,
    estilo: String,
  },

  methods: {
    disparaAcao() {
      if (this.confirmacao) {
        if (confirm("Confirma esta operação ?")) {
          this.$emit("botaoAtivado");
          /* 
            this.$emit -> permite disparar um evento com o nome que eu quiser
          */
        }
        return;
      }
      this.$emit("botaoAtivado");
    },
  },

  computed: {
    estiloDoBotao() {
      if (this.estilo == "padrao" || !this.estilo) return "botao-padrao";
      if (this.estilo == "perigo") return "botao-perigo";
    },
  },
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao:hover {
  cursor: pointer;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>