<template>
    <div>
			<v-card v-for="(item, index) in data"
							:key="index">
											<v-card-title>
												<span class="headline">{{item.nombre}} {{item.apellido_paterno}} {{item.apellido_materno}}</span>
											</v-card-title>
											<v-card-text>
												<v-container grid-list-md>
													<v-layout wrap>
														<v-flex xs12 sm6 md4>
															<v-text-field v-model="item.numero_de_documento" :hint="item.tipo_de_documento" persistent-hint disabled></v-text-field>
														</v-flex>
														<v-flex xs12 sm6 md4>
															<v-text-field v-model="item.parentesco" hint="Parentesco" persistent-hint disabled></v-text-field>
														</v-flex>
														<v-flex xs12 sm6 md4>
															<v-text-field v-model="item.fecha_nacimiento" hint="Fecha de nacimiento" persistent-hint disabled></v-text-field>
														</v-flex>
														<v-flex xs12 sm6 md4>
															<v-text-field v-model="item.lugar_de_nacimiento" hint="Lugar de nacimiento" persistent-hint disabled></v-text-field>
														</v-flex>
														<v-flex xs12>
															<v-text-field v-model="direccion" hint="Dirección" persistent-hint :disabled="editDisable" ></v-text-field>
														</v-flex>
														<v-flex xs12 sm6>
															<v-select
																:items="['si', 'no']"
																hint="Supervivencia"
																:label="supervivencia"
																:v-model="supervivencia"
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
												<v-btn v-else color="blue darken-1" flat @click.native="save(key, direccion, supervivencia)">Guardar</v-btn>
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
			datas:this.data,
			direccion: this.dr,
			supervivencia: this.sp,
			keys: this.id,
			edit: true,
			dialog2: false,
      notifications: false,
      sound: true,
			widgets: false,
			editDisable: true,
    }
	}, 
	mounted(){},
	created(){
	},
	computed:{
		
	},
	methods:{
		editar(){
			this.edit = false
			this.editDisable=false
		},
		save(index, direccion, supervivencia){
			this.edit = true
			this.editDisable=true
			if(direccion !== '' && supervivencia !==''){				
				firebase.database().ref().child('usuario/0001ED/datos_familiares/'+index).update({
					direccion: direccion,
					supervivencia: supervivencia
				}).then(	EventBus.$emit('view-dialog2', false))
			}
			
		},
		cancel(){
			EventBus.$emit('view-dialog2', false)
			this.edit = true
			this.editDisable=true	
		}
	},
	components:{'formFamily': form}
}
</script>