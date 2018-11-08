<template>
<div>
<nav class="navbar navbar-expand-lg navbar-light justify-content-end ">
  <div class="container divImg">
    <img class="d-flex justify-content-start logoEngie" src="https://files.slack.com/files-pri/T0NNB6T0R-FDYCEJTHS/image.png" alt="">
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link justify-content-end" href="#"><img class="iconNav" src="https://files.slack.com/files-pri/T0NNB6T0R-FDZHW1E79/personales_2.png" alt="Datos Personales"> Datos Personales<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><img class="iconNav" src="https://files.slack.com/files-pri/T0NNB6T0R-FDYDD4W5R/familiares.png" alt="Datos Familiares"> Datos Familiares</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><img class="iconNav" src="https://files.slack.com/files-pri/T0NNB6T0R-FDXQ31Z3J/bancario.png" alt="Datos Bancarios"> Datos Bancarios</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#"><img class="iconNav" src="https://files.slack.com/files-pri/T0NNB6T0R-FDYBBJV1A/profesionales.png" alt="Datos profesionales"> Datos profesionales</a>
      </li>
    </ul>
  </div>
</nav>
<router-view/>
</div>
</template>
 <script>
import HelloWorld from "./components/HelloWorld";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      //
    };
  }
};
</script>
<style scoped>
.logoEngie {
  max-width: 210px !important;
  max-height: 93px !important;
}
.iconNav {
  width: 25px;
  padding-bottom: 5px;
}

nav {
  background-color:#009FE3 ;
}

nav ul {
    float: right;
    justify-content: end;
}

.divImg {
  padding: 0;
  flex: 1 1 50%;
  }
</style>


