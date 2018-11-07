<template>
    <div role="form">
        <div>
					<progress value="0" max="100" id="uploader"></progress>
					<input accept=".pdf" type="file" value="upload" @change="fileBtn($event)">
				</div>
				<v-btn fab dark color="indigo" @click="uploadpdf()">
					<v-icon dark>add</v-icon>
				</v-btn>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'',
    data(){
        return {
					filepdf: ''
        }
    }, 
	mounted(){},
	created(){},
	watch: {},
	computed:{},
	methods:{
      uploadpdf(){
				let storageRef = firebase.storage().ref('test/'+this.filepdf.name);
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
			},
			fileBtn:function(e){
					e.preventDefault();
				const uploader = document.getElementById('uploader');
				let getFile = e.target.files[0];
				this.filepdf = getFile				
			}
    },
	components:{}
}
</script>
