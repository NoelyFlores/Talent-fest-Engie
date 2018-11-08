<template>
<div>
								<v-card-title>
									<span class="headline">Datos del Pariente</span>
								</v-card-title>
								<v-card-text>
									<v-container grid-list-md>
										<v-radio-group v-if="viewParent" v-model="pareja" label="Tipo de pareja" hint="Tipo de pareja" persistent-hint>
												<v-radio value="Conyuge" label="Conyuge"></v-radio>
												<v-radio value="Conviviente" label="Conviviente"></v-radio>
										</v-radio-group>
										<v-layout wrap>
											<v-flex xs12 sm6 md4>
												<v-text-field v-model="name" label="Nombre" hint="Nombre" persistent-hint></v-text-field>
											</v-flex>
											<v-flex xs12 sm6 md4>
												<v-text-field v-model="firstName" label="Apellido paterno" hint="Apellido paterno" persistent-hint></v-text-field>
											</v-flex>
											<v-flex xs12 sm6 md4>
												<v-text-field v-model="lastName" label="Apellido materno" hint="Apellido materno" persistent-hint></v-text-field>
											</v-flex>
											<v-radio-group v-model="type_doc">
												<v-radio value="DNI" label="DNI"></v-radio>
												<v-radio value="Carnet de extranjeria" label="Carnet de extranjeria"></v-radio>
											</v-radio-group>
											<v-flex xs12 sm6 md4>
												<v-text-field v-model="numdoc" label="Número de documento" hint="Número de documento" persistent-hint></v-text-field>
											</v-flex>
											<v-flex xs12 sm6 md4>
												<v-text-field v-model="pas" label="Pasaporte" hint="Pasaporte" persistent-hint></v-text-field>
											</v-flex>
											<v-radio-group v-model="type_super" label="Supervivencia" hint="Supervivencia" persistent-hint>
												<v-radio value="si" label="SI"></v-radio>
												<v-radio value="no" label="No"></v-radio>
											</v-radio-group>
											<v-flex xs12 sm6 md4>
												<v-text-field v-model="lugar" label="Lugar de nacimiento" hint="Lugar de nacimiento" persistent-hint></v-text-field>
											</v-flex>
											<v-flex xs12>
												<v-text-field v-model="direccion" label="Dirección" hint="Dirección" persistent-hint required></v-text-field>
											</v-flex>
											<v-flex xs12>
												<v-text-field v-model="fecha" label="Fecha de nacimiento" type="Fecha de nacimiento" persistent-hint required></v-text-field>
											</v-flex>
											<div role="form">
												<span>Adjuntar dato probatorio</span>
												<progress value="0" max="100" id="uploader"></progress>
												<input accept=".pdf" type="file" value="upload" @change="fileBtn($event)">
											</div>
										</v-layout>
									</v-container>
									<small>*indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" flat @click.native="cancel()">Close</v-btn>
									<v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
								</v-card-actions>
							</div>
</template>
<script>
import firebase from 'firebase'
import {EventBus} from '@/plugins/bus.js'
export default {
		name:'from-i-family',
		props:['user', 'parentesco'],
    data(){
        return {
					name:'',
					firstName:'',
					lastName:'',
					type_doc:'',
					numdoc:'',
					pas:'',
					type_super:'',
					lugar:'',
					direccion:'',
					fecha:'',
					filepdf: '',
					pareja: ''
        }
    }, 
	mounted(){},
	created(){},
	watch: {},
	computed:{
		viewParent: function(params) {
			if(this.parentesco === 'hijo'){
				return false
			}else{
				return true
			}
			
		}
	},
	methods:{
				fileBtn:function(e){
			console.log(e)
			e.preventDefault();
				const uploader = document.getElementById('uploader');
				let getFile = e.target.files[0];
				this.filepdf = getFile				
			},
			save(){
				const key = firebase.database().ref().child('usuario/'+this.user+'/datos_familiares').push().key
				firebase.database().ref().child('usuario/'+this.user+'/datos_familiares/'+key).set({
					nombre:this.name,
					apellido_paterno:this.firstName,
					apellido_materno: this.lastName,
					direccion: this.direccion,
					fecha_nacimineto: this.fecha,
					key: key,
					lugar_de_nacimiento: this.lugar,
					numero_de_documento: this.numdoc,
					parentesco: this.parentesco,
					supervivencia: this.type_super,
					tipo_de_documento: this.type_doc,
					typo_de_pareja: this.pareja,
					doc_adjunto:'gs://plataforma-engie-rrhh.appspot.com//'+'usuario/'+this.user+'/datos_familiares/'+key+'/'+ this.filepdf.name
				})
				
				let storageRef = firebase.storage().ref('usuario/'+this.user+'/datos_familiares/'+key+'/'+ this.filepdf.name);
				let task = storageRef.put(this.filepdf)	
				task.on('state_changed',
				function progress(snapshot){
					let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
					uploader.value = percentage;
				},
				function error(err){
					console.log(err);
				},
				function complete(){
					console.log('complete upload');
				}
				);
				EventBus.$emit('view-dialog', false)
			},
			cancel(){
				EventBus.$emit('view-dialog', false)
			}
	},
	components:{}
}
</script>