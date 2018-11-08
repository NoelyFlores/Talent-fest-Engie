<template>
    <div>
			<div class="image-family">
				<v-img></v-img>
				<v-img></v-img>
				<v-img></v-img>
			</div>
			<div class="image-child">
				  <v-timeline>
						<v-timeline-item
							v-for="(item, index) in data"
							:key="index"
							color="red lighten-2"
							large
						>
							<span slot="opposite"></span>
							  <v-card>
								<v-card-title>
									<span>{{item.nombre}} {{item.apellido_paterno}}</span>
									<v-spacer></v-spacer>				
								</v-card-title>
								<v-divider></v-divider>
								<!-- form edit -->
								<v-layout row justify-center>
									<v-dialog v-model="dialog2" persistent max-width="600px">
										<v-btn slot="activator" color="primary" @click="view(item.key, item.direccion, item.supervivencia )" dark>ver mas</v-btn>
										<v-card>
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
									</v-dialog>
								</v-layout>
								<!-- fin -->
							</v-card>
						</v-timeline-item>
					</v-timeline>
					 <v-layout row justify-center>
						<v-dialog v-model="dialogInsert" persistent max-width="600px">
							<v-btn slot="activator" @click.native="typeParen='hijo'" fab dark color="indigo">
							<v-icon dark>add</v-icon></v-btn>
							<v-card>
								<formFamily :user="keyUser" :parentesco="typeParen"></formFamily>
							</v-card>
						</v-dialog>
					</v-layout>
				</div>
	</div>
</template>
<script>
import firebase from 'firebase'
import form from '@/components/from-i-family'
import {EventBus} from '@/plugins/bus.js'
export default {
    name:'dataFamily',
    data () {
    return {
			typeParen:'',
			keyUser:'0001ED',
			dialogInsert:false,
			editDisable: true,
			direccion: '',
			supervivencia: '',
			keys: '',
			edit: true,
			dialog2: false,
			dialog: false,
      dialog3: true,
      notifications: false,
      sound: true,
      widgets: false,
			data: []
    }
	},
	watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
      }
    }, 
	mounted(){},
	created(){
		this.connection()
		EventBus.$on('view-dialog', (data)=>{
			this.dialogInsert = data
		})
	},
	beforeDestroy(){
    EventBus.$off()
  },
	computed:{},
	methods:{
		connection () {			
			let tablesData = firebase.database().ref().child('usuario/0001ED/datos_familiares')		
			tablesData.on('value', data => {
				const element = data.val()
				Object.keys(element).forEach(datas => {
					console.log(element)
				this.data.push(element[datas])
				})				
			})
		},
		view(key,ln, s){
			this.direccion = ln
			this.supervivencia = s
			this.key=key
		},
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
				}).then(console.log(index, direccion, supervivencia))
			}
			
		},
		cancel(){
			this.dialog2 = false
			this.edit = true
			this.editDisable=true
		}
	},
	components:{'formFamily': form}
}
</script>
