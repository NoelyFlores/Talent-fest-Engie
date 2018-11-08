<template>
<div>
<div class="container fluid text-center ">
  <h2>Bienvenida(o), Alida</h2>
  <p class="secondLineText">¿Qué información desea actualizar?</p>
</div>
<div class="container fluid text-center ">
  <div class="row text-center">
    <div class="col-6">
      <img class="imgDatosT" src="https://files.slack.com/files-pri/T0NNB6T0R-FDZHW1E79/personales_2.png" alt="Datos Personales">
      <p class="dPersonales">Datos Personales</p>

      </div>
      <div class="col-6">
      <img class="imgDatosT" src="https://files.slack.com/files-pri/T0NNB6T0R-FDYDD4W5R/familiares.png" alt="Datos Familiares">
      <p class="dFamiliares">Datos Familiares</p>
    </div>
  </div>
  <div class="row text-center">
    <div class="col-6">
      <img class="imgDatosB" src="https://files.slack.com/files-pri/T0NNB6T0R-FDXQ31Z3J/bancario.png" alt="Datos Bancarios">
      <p class="dBancarios">Datos Bancarios</p>
      </div>
      <div class="col-6">
      <img class="imgDatosB" src="https://files.slack.com/files-pri/T0NNB6T0R-FDYBBJV1A/profesionales.png" alt="Datos Profesionales">
      <p class="dProfesionales">Datos Profesionales</p>
    </div>
  </div>
</div>
</div>

</template>
<script>
export default {
  name: "home",
  data() {
    return {
      bottomNav: "recent"
    };
  },
  mounted() {},
  created() {},
  watch: {},
  computed: {},
  methods: {
    view() {
      this.$router.push("prueba");
    }
  },
  components: {}
};
</script>
<style scoped>

.imgDatosT, .imgDatosB {
  width: 120px;
  height: 120px;
}

.imgDatosT {
  margin-top: 15px;
}

.dPersonales {
  color: #008737;
}

.dFamiliares {
  color: #E10019;
}

.dBancarios {
  color: #005FAA;
}

.dProfesionales {
  color: #552382;
}

.dPersonales, .dFamiliares, .dBancarios, .dProfesionales, .secondLineText, h2{
   font-family: Arial;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  margin-top: 15px;
}

h2 {
  color: #69AF23;
  font-size: 24px;
  margin-top: 30px;
}

.secondLineText {
  color: #000000;
  font-size: 18px;
  font-weight: normal;
  margin-top: 12px;
}
</style>
