<template>
<v-form v-model="valid">
<v-container grid-list-md text-xs>
  <v-layout  align-center justify-center row wrap >
      <v-flex xs8>
        <v-toolbar-title class="titleH">Haberes</v-toolbar-title>
        <v-text-field
          v-model="name"
          label="Banco"
          required
          :disabled = "stateHaberes"
        ></v-text-field>
        <v-text-field
          v-model="number"
          :rules="numberRules"
          :counter="17"
          label="N° Cuenta Ahorro(BCP de lo contrario cuenta interbancario)"
          required
          :disabled = "stateHaberes"
        ></v-text-field>
        <small>Documento sustentatorio</small>
				<input 
          class="inputArch" 
          accept=".pdf" 
          type="file" 
          value="upload" 
          @change="fileBtn($event)" 
          :disabled = "stateHaberes" >
				<v-btn
          :disabled = "stateHaberes" 
          fab dark 
          color="indigo" 
          @click="uploadpdf()">
					<v-icon dark>add</v-icon>
				</v-btn>        
				<progress 
          value="0" 
          max="100" 
          id="uploader"
          :disabled = "stateHaberes"></progress>
      </v-flex>
      <v-flex xs4>
        <v-btn outline round class="btnColor" v-if="editbtnHb" @click=saveHb()>
          Guardar
        </v-btn>
        <v-btn outline round class="btnColor" v-else  @click=editHaberes()>
          Editar
        </v-btn>
      </v-flex>
      <v-flex xs8>
        <v-toolbar-title class="titleH">CTS</v-toolbar-title>
        <v-text-field
          v-model="bancoName"
          label="Banco"
          required
          :disabled = "stateCTS"      
          @click="editBank = true"
        ></v-text-field>
        <v-radio-group :disabled = "stateCTS" v-model="moneda">
          <v-radio value="Soles" label="Soles"></v-radio>
          <v-radio value="Doláres" label="Doláres"></v-radio>
        </v-radio-group>
        <v-card id="create" v-if="editBank">
          <v-container fluid grid-list-md>
              <v-flex xs12 sm6 md4>
                <v-subheader>Blablablabla (indicación)</v-subheader>
                <v-radio-group >
                  <v-radio value="top" label="Depositar todo mi CTS"></v-radio>
                  <v-radio value="right" label="Empezar a depositar CTS"></v-radio>
                </v-radio-group>
              </v-flex>
          </v-container>
        </v-card>     
      </v-flex>
      <v-flex xs4>
        <v-btn outline round v-if="editbtnCTS" class="btnColor"  @click="saveCTS()">
          Guardar
        </v-btn>
        <v-btn outline round v-else class="btnColor" @click="editCTS()">
          Editar
        </v-btn>           
      </v-flex>
  </v-layout>
</v-container>
</v-form>    
</template>

<script>
import firebase from "firebase";
export default {
  name: "bankdata",
  data() {
    return {
      filepdf: "",
      editBank: false,
      editbtnHb: false,
      editbtnCTS: false,
      stateHaberes: true,
      stateCTS: true,
      valid: false,
      name: "",
      number: "",
      numberRules: [
        v =>
          v.length <= 17 || "Número de cuenta debe tener menos de 17 caracteres"
      ],
      bancoName: "",
      moneda: ""
    };
  },
  mounted() {},
  created() {
    this.firebaseDatosBank();
  },
  watch: {},
  computed: {},
  methods: {
    firebaseDatosBank() {
      let data = firebase
        .database()
        .ref()
        .child("usuario/0001ED/datos_bancarios");
      data.on("value", data2 => {
        const data3 = data2.val();
        this.name = data3.haberes.banco;
        this.number = data3.haberes.cuenta_ahorros;
        this.bancoName = data3.cts.banco;
        this.moneda = data3.cts.moneda;
      });
    },
    editHaberes() {
      this.stateHaberes = false;
      this.editbtnHb = true;
    },
    editCTS() {
      this.stateCTS = false;
      this.editbtnCTS = true;
    },
    saveCTS() {
      this.stateCTS = true;
      this.editbtnCTS = false;
      this.editBank = false;
      firebase
        .database()
        .ref()
        .child("usuario/0001ED/datos_bancarios/cts")
        .update({
          banco: this.bancoName,
          moneda: this.moneda
        });
    },
    saveHb() {
      this.stateHaberes = true;
      this.editbtnHb = false;
      firebase
        .database()
        .ref()
        .child("usuario/0001ED/datos_bancarios/haberes")
        .update({
          banco: this.name,
          cuenta_ahorros: this.number
        });
    },
    uploadpdf() {
      let storageRef = firebase.storage().ref("test/" + this.filepdf.name);
      let task = storageRef.put(this.filepdf);
      task.on(
        "state_changed",
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          console.log("complete upload");
        }
      );
    },
    fileBtn: function(e) {
      e.preventDefault();
      const uploader = document.getElementById("uploader");
      let getFile = e.target.files[0];
      this.filepdf = getFile;
    }
  },
  components: {}
};
</script>
<style>
.titleH {
  color: #69af23;
}
.btnColor {
  color: #005faa;
  margin: 5em;
}
.inputArch{
  background-color: #4CAF50;
  border: solid 5px;
  color: white;
}
</style>
