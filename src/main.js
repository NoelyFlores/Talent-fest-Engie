import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';
Vue.use(VueResource);
 
Vue.use(Vuetify)
Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyDF54Qh5j32mrd-s7hzoBU4U7atuDUJlo8",
  authDomain: "plataforma-engie-rrhh.firebaseapp.com",
  databaseURL: "https://plataforma-engie-rrhh.firebaseio.com",
  projectId: "plataforma-engie-rrhh",
  storageBucket: "plataforma-engie-rrhh.appspot.com",
  messagingSenderId: "947421425388"
};
firebase.initializeApp(config);
firebase.auth().signInWithEmailAndPassword('engie@gmail.com', '12345678')
  .then(console.log('succefull exit'))
  .catch()
let app
firebase.auth().onAuthStateChanged((e) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      render: h => h(App),
      router
    })
  }
})
/* eslint-disable no-new */

