import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

import requests from './requests'  //Запросы
import Store from './store'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBx-7pOlx-nasILs9NcqL39MpGss1xaldo",
  authDomain: "inventory-761b6.firebaseapp.com",
  databaseURL: "https://inventory-761b6.firebaseio.com",
  projectId: "inventory-761b6",
  storageBucket: "inventory-761b6.appspot.com",
  messagingSenderId: "463699646821",
  appId: "1:463699646821:web:0992fa64a5b5c6249fe98c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(requests)

new Vue({
  router,
  data: Store,
  render: h => h(App)
}).$mount('#app')

