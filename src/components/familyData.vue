<template>
    <div>
			<v-container grid-list-md text-xs-center>
				<v-layout row wrap>
					<v-flex xs6>
						<v-avatar size="105px">
						<v-img src="https://files.slack.com/files-pri/T0NNB6T0R-FDYGGQ2GJ/img_0855.jpg">
						</v-img>
						</v-avatar>
						<p>Alida Contreras</p>
					</v-flex>
					<v-flex xs6>			
						<v-avatar size="105px" class="v-avatar v-avatar--tile">
						<v-img class="imgFamilia" src="https://files.slack.com/files-pri/T0NNB6T0R-FDY0UHK6C/user__1_.jpg">
						</v-img>
						</v-avatar>
						<p>Cónyuge/conviviente</p>
						<v-btn @click="insertConyuge()" round color="indigo" class="abc">Administrador</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
			<div class="image-child">
				  <v-timeline class="arbol">
						<memberFamily v-for="(item, index) in data"
							:key="index"
							color="red lighten-2"
							large :dataMember = "item"/>						
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
import formEdit from '@/components/form-edit-family'
import {EventBus} from '@/plugins/bus.js'
import memberFamily from '@/components/memberFamily'
export default {
    name:'dataFamily',
    data () {
    return {
			buttonEdit:false,
			typeParen:'',
			keyUser:'0001ED',
			dialogInsert:false,
			editDisable: true,
			direccion: '',
			supervivencia: '',
			id: '',
			edit: true,
			dialog2: false,
			dialog: false,
      dialog3: true,
      notifications: false,
      sound: true,
      widgets: false,
			data: [],
			data2: []
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
		EventBus.$on('view-dialog2', (data)=>{
			this.dialog2 = data
			this.data2=[]

		})
	},
	beforeDestroy(){
    EventBus.$off()
  },
	computed:{},
	methods:{
		connection () {
			const temp = []	
			let tablesData = firebase.database().ref().child('usuario/0001ED/datos_familiares')		
			tablesData.on('value', data => {
				const element = data.val()
				Object.keys(element).forEach(datas => {
				temp.push(element[datas])
				})
				this.data=temp		
			})
		},
			
		insertConyuge(){
			this.dialogInsert = true
			this.typeParen = 'conyugue'
		},
		cancel(){
			this.dialog2 = false
			this.edit = true
			this.editDisable=true
		}
	},
	components:{'formFamily': form, 'formEdit':formEdit,memberFamily}
}
</script>
<style scoped>
p {
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    font-size: 14px;
    color: #69AF23;
}

.caja {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    border: 2px solid blue;
}
	.image-child{
		    padding: 0px 200px !important
	}
	@media(max-width: 720px){
		.image-child{
		    padding: 0px 150px !important
	}
	}
	@media(max-width: 600px){
		.image-child{
		    padding: 0px 100px !important
	}
	}
	@media(max-width: 50px){
		.image-child{
		    padding: 0px 50px !important
	}
	}

</style>
