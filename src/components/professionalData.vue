<template>
<v-container grid-list-md text-xs>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-flex xs12>
        <h3>Estudios superiores:</h3>
        </v-flex>
        <v-layout row  justify-center>
        <v-flex xs12 sm6> 
        <v-btn outline color="indigo" @click="muestraDatos= true">Maestria completa</v-btn>
        </v-flex>
        <v-flex xs12 sm6>
        <v-btn outline color="indigo">Agregar</v-btn>
        </v-flex>
        </v-layout>
        <v-flex xs12 sm6 v-if="muestraDatos">
        <h3>Datos de estudio:</h3>
        <v-select v-model="gradoProfesion"  
          :items="['Sin educación formal', 'Educación especial incompleta', 'Educación especial completa', 'Educacion primaria completa', 'Educación secundaria completa', 'Técnica completa', 'Universidad completa', 'Grado de bachiller', 'Titulado', 'Maestría incompleta', 'Maestría completa','Grado de doctor']"
          disabled     
          required
        ></v-select>
        <h3>Tipo de institución</h3>
        <v-select v-model="tipoInstituto"
          :items="['Educaión superior de formacion artística','Instituto superior pedagógico','Instituto de educacion superior tecnológica','Universidad']"
          disabled
          required>
        </v-select>
        <h3>Descripción de carrera</h3>
        <v-text-field disabled="" v-model="profesión" label="Profesión" required></v-text-field>
        <v-text-field disabled="" v-model="institucion" label="Nombre de institución" required></v-text-field>
        <h4>Desde:</h4> 
        <v-flex xs6>
        <v-text-field disabled v-model="desde" required></v-text-field>
        </v-flex>
        <h4>Hasta:</h4> 
        <v-flex xs6>
        <v-text-field disabled v-model="hasta" required></v-text-field>
        </v-flex>
        <v-text-field disabled v-model="duracion" label="Duración" required></v-text-field>
        <v-text-field disabled v-model="lugar" label="Lugar de institución" required></v-text-field>
        <v-flex xs12 sm6>
          <v-btn outline @click="muestraDatos= false" color="indigo">Cerrar</v-btn>
        </v-flex>
      </v-flex>  
      <v-flex xs12>
        <v-flex xs12>
          <h3>Idiomas:</h3>
        </v-flex>
        <v-layout row  justify-center>
          <v-flex xs12 sm6> 
           <v-btn outline @click="muestraIdioma = true" color="indigo">Ingles</v-btn>
          </v-flex>
          <v-flex xs12 sm6>
            <v-btn outline @click="nuevoIdioma = true" color="indigo">Agregar</v-btn>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm6 v-if="muestraIdioma">
          <h3>Datos de idioma:</h3>
          <v-text-field disabled v-model="idioma" label="Idioma" required></v-text-field>
          <h3>Nivel de idioma:</h3>
          <v-select v-model="lectura"  
            :items="['Básico','Intermedio','Avanzado']"
            label="Lectura"
            disabled     
            required
          ></v-select>     
          <v-select v-model="escritura"  
            :items="['Básico','Intermedio','Avanzado']"
            label="Escritura"
            disabled     
            required
          ></v-select>  
          <v-select v-model="habla"  
            :items="['Básico','Intermedio','Avanzado']"
            label="Habla"
            disabled     
            required
          ></v-select>
        <v-flex xs12 sm6>
          <v-btn outline @click="muestraIdioma = false" color="indigo">Cerrar</v-btn>
        </v-flex>     
        </v-flex>
        <v-flex xs12 sm6 v-if="nuevoIdioma">
          <h3>Nuevo idioma:</h3>
          <v-text-field label="Idioma" required></v-text-field>
          <h3>Nivel de idioma:</h3>
          <v-select
            :items="['Básico','Intermedio','Avanzado']"
            label="Lectura"     
            required
          ></v-select>     
          <v-select  
            :items="['Básico','Intermedio','Avanzado']"
            label="Escritura"     
            required
          ></v-select>  
          <v-select 
            :items="['Básico','Intermedio','Avanzado']"
            label="Habla"     
            required
          ></v-select>     
          <v-flex xs12 sm6>
            <v-btn outline @click="saveNewLanguage()" color="indigo">Guardar</v-btn>
          </v-flex>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import firebase from "firebase";
export default {
  name: "profData",
  data() {
    return {
      nuevoIdioma:false,
      muestraDatos:false,
      muestraIdioma:false,
      gradoProfesion: "",
      tipoInstituto: "",
      profesión: "",
      institucion: "",
      desde: "",
      hasta: "",
      duracion: "",
      lugar: "",
      idioma:"",
      lectura:"",
      escritura:"",
      habla:""
    };
  },
  mounted() {},
  created() {
    this.firebaseDataProfesion();
  },
  watch: {},
  computed: {},
  methods: {
    firebaseDataProfesion() {
      let dataEstudios = firebase
        .database()
        .ref()
        .child("usuario/0001ED/datos_profesionales");
      dataEstudios.on("value", dataP => {
        const data = dataP.val();
        console.log(data);
        this.gradoProfesion = data.datos_de_estudios;
        this.tipoInstituto = data.descripción_tipo_de_institución;
        this.profesión = data.descripción_de_carrera.profesión;
        this.institucion = data.descripción_de_carrera.nombre_de_institucion;
        this.desde = data.descripción_de_carrera.desde;
        this.hasta = data.descripción_de_carrera.hasta;
        this.duracion = data.descripción_de_carrera.duracion;
        this.lugar = data.descripción_de_carrera.lugar;
        this.idioma= data.idiomas.idiomas_adicionales.idioma_adicional
        this.lectura = data.idiomas.idiomas_adicionales.ingles.lectura
        this.escritura = data.idiomas.idiomas_adicionales.ingles.escritura
        this.habla = data.idiomas.idiomas_adicionales.ingles.habla
      });
    },
    saveNewLanguage(){
      this.nuevoIdioma = false
    }
  },
  components: {}
};
</script>