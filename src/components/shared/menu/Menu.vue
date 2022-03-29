<template>
  <nav>
    <ul>
      <li v-for="rota in rotas" :key="rota.path">
        <router-link :to="rota.path ? rota.path : '/'">
          {{ rota.titulo }}
        </router-link>
      </li>
      <!-- <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cadastro">Cadastro</router-link></li> -->
    </ul>
  </nav>
</template>

<script>
export default {
  // props: ["rotas"],
  props: {
    rotas: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>