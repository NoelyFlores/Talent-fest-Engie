<template>
  <v-container fluid grid-list-md text-xs-center class="general" >
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="contenido">
            <div class="text-xs-center">
            <h1>Ingresar</h1>
             <div class="text-xs-center">
              <v-btn round color="indigo" class="abc">Colaborador</v-btn>
             <v-btn round color="indigo" class="abc">Administrador</v-btn>
             </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  


</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {},
  created() {},
  watch: {},
  computed: {},
  methods: {},
  components: {}
};
</script>
<style scoped>
.contenido {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 80px);
}
.general {
  padding: 0%
}
</style>
