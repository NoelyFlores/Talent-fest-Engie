<template>
			<div>
																				<v-card>
																				<v-card-title>
																					<span class="headline">{{name}} {{firstName}} {{lastName}}</span>
																				</v-card-title>
																				<v-card-text>
																					<v-container grid-list-md>
																						<v-layout wrap>
																							<v-flex xs12 sm6 md4>
																								<v-text-field v-model="numdoc" hint="DNI" persistent-hint disabled></v-text-field>
																							</v-flex>
																							<v-flex xs12 sm6 md4>
																								<v-text-field v-model="parentesco" hint="Parentesco" persistent-hint disabled></v-text-field>
																							</v-flex>
																							<v-flex xs12 sm6 md4>
																								<v-text-field v-model="fecha" hint="Fecha de nacimiento" persistent-hint disabled></v-text-field>
																							</v-flex>
																							<v-flex xs12 sm6 md4>
																								<v-text-field v-model="lugar" hint="Lugar de nacimiento" persistent-hint disabled></v-text-field>
																							</v-flex>
																							<v-flex xs12>
																								<v-text-field v-model="direccion" hint="Dirección" persistent-hint :disabled="editDisable" ></v-text-field>
																							</v-flex>
																							<v-flex xs12 sm6>
																								<v-select
																									:items="['si', 'no']"
																									hint="Supervivencia"
																									:label="type_super"
																									:v-model="type_super"
																									persistent-hint
																									:disabled="editDisable"
																								></v-select>
																							</v-flex>
																						</v-layout>
																					</v-container>
																					<small>*indicates required field</small>
																				</v-card-text>
																				<v-card-actions>
																					<v-spacer></v-spacer>
																					<v-btn v-if="edit" color="blue darken-1" flat @click="editar()">Editar</v-btn>
																					<v-btn v-else color="blue darken-1" flat @click.native="save(key)">Guardar</v-btn>
																					<v-btn color="blue darken-1" flat @click.native="cancel()">Cerrar</v-btn>
																				</v-card-actions>
																			</v-card>
			</div>
</template>
<script>
import firebase from 'firebase'
import form from '@/components/from-i-family'
import {EventBus} from '@/plugins/bus.js'
export default {
		name:'dataFamily',
		props:['data', 'dr', 'sp', 'id'],
    data () {
    return {
					dataMember: this.$route.params.dataMember,
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
					pareja: '',					
			editDisable: true,					
			edit: true,
			dialog: true
    }
	}, 
	mounted(){},
	created(){
					
/* 					
apellido_materno: "Vega",
					apellido_paterno: "Contreras ",
					direccion: "av. Las flores 269 ,huancayo ,huancayo",
					fecha_de_nacimiento: "27/09/2015",
					lugar_de_nacimiento: "Huancayo",
					nombre: "Oscar",
					numero_de_documento: 20123455,
					parentesco: "Hijo",
					supervivencia: "si",
					tipo_de_documento: "dni"
							 */
					console.log(this.dataMember)
		      this.name = this.dataMember.nombre;
					this.firstName = this.dataMember.apellido_paterno;
					this.lastName =this.dataMember.apellido_materno;
					this.direccion =this.dataMember.direccion;
					this.fecha=this.dataMember.fecha_de_nacimiento;
					this.key = this.dataMember.key;
					this.lugar = this.dataMember.lugar_de_nacimiento;
					this.numdoc = this.dataMember.numero_de_documento;
					this.parentesco= this.dataMember.parentesco;
					this.type_super= this.dataMember.supervivencia;
					this.type_doc= this.dataMember.tipo_de_documento;
					console.log(this.name)
	},
	computed:{
		
	},
	methods:{

		editar(){
			this.edit = false
			this.editDisable=false
		},
		save(index){
			this.edit = true
			this.editDisable=true
			if(this.direccion !== '' && this.supervivencia !==''){				
				firebase.database().ref().child('usuario/0001ED/datos_familiares/'+index).update({
					direccion: this.direccion,
					supervivencia: this.type_super
				}).then(
					this.$router.push('dfamily')
				)
			}
			
		},
		cancel(){
			this.edit = true
			this.editDisable=true
			this.$router.push('dfamily')
		}
	},
	components:{'formFamily': form}
}
</script>