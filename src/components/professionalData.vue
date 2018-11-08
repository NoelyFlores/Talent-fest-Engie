<template>
<v-container grid-list-md text-xs>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-flex xs12>
      <h3>Estudios superiores:</h3>
      </v-flex>
      <v-layout row  justify-center>
      <v-flex xs12 sm6> 
      <v-btn outline color="indigo">Maestria completa</v-btn>
      </v-flex>
      <v-flex xs12 sm6>
      <v-btn outline color="indigo">Agregar</v-btn>
      </v-flex>
      </v-layout>
      <v-flex xs12 sm6>
        <h3>Datos de estudio:</h3>
        <v-select v-model="gradoProfesion"  
          :items="['Sin educación formal', 'Educación especial incompleta', 'Educación especial completa', 'Educacion primaria completa', 'Educación secundaria completa', 'Técnica completa', 'Universidad completa', 'Grado de bachiller', 'Titulado', 'Maestría incompleta', 'Maestría completa','Grado de doctor']"
          label="Grado de Estudio"
          required
        ></v-select>
        <h3>Tipo de institución</h3>
        <v-select v-model="tipoInstituto"
          :items="['Educaión superior de formacion artística','Instituto superior pedagógico','Instituto de educacion superior tecnológica','Universidad']"
          label="Tipo de institución"
          required>
        </v-select>
        <h3>Descripción de carrera</h3>
        <v-text-field  v-model="profesión" label="Profesión" required></v-text-field>
        <v-text-field v-model="institucion" label="Nombre de institución" required></v-text-field>
        <h4>Desde:</h4> 
        <v-flex xs6>
        <v-text-field  v-model="desde" required></v-text-field>
        </v-flex>
        <h4>Hasta:</h4> 
        <v-flex xs6>
        <v-text-field  v-model="hasta" required></v-text-field>
        </v-flex>
        <v-text-field  v-model="duracion" label="Duración" required></v-text-field>
      <v-text-field v-model="lugar" label="Lugar de institución" required></v-text-field>
      </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'profData',
    data(){
        return {
          gradoProfesion :"",
          tipoInstituto:"",
          profesión:"",
          institucion:"",
          desde:"",
          hasta:"",
          duracion:"",
          lugar:""
        }
    }, 
	mounted(){},
	created(){
    this.firebaseDataProfesion();
  },
	watch: {},
	computed:{},
	methods:{
    firebaseDataProfesion(){
      let dataEstudios = firebase.database().ref().child("usuario/0001ED/datos_profesionales");
      dataEstudios.on("value",dataP =>{
        const data = dataP.val()
        console.log(data)
        this.gradoProfesion = data.datos_de_estudios
        this.tipoInstituto = data.descripción_tipo_de_institución
        this.profesión = data.descripción_de_carrera.profesión
        this.institucion = data.descripción_de_carrera.nombre_de_institucion        
        this.desde = data.descripción_de_carrera.desde
        this.hasta = data.descripción_de_carrera.hasta
        this.duracion = data.descripción_de_carrera.duracion
        this.lugar = data.descripción_de_carrera.lugar
      })
    }
  },
	components:{}
  }
</script>