<template>
    <v-timeline-item>
                                <v-card>
                                <v-card-title>
                                    <v-spacer></v-spacer>	
                                    <span>{{name}}</span>			
                                </v-card-title>
                                <v-divider></v-divider>
                                    <v-btn color="primary" @click="view()" dark>ver mas</v-btn>
                                    
                            </v-card>
                        </v-timeline-item>
</template>
<script>
export default {
    name:'memberFamily',
    props:  ['dataMember'],
    data(){
        return{

			name:'',
			buttonEdit:false,
			typeParen:'',
			keyUser:'0001ED',
			dialogInsert:false,
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
    computed:{
        /* dataMember: function(){
            return this.dataMember
        } */
    },
    created(){
this.name = this.dataMember.nombre;
    },
    methods:{
      view(){
				this.$router.push({ name: 'formEditFamily', params: { dataMember: this.dataMember }})
		}
	}
}

</script>
