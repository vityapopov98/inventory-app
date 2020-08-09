<template>
  <div class="CreateItem">
    <form action="/api/create-item" method="post" v-show="!isLoad">
    <!-- <h2>{{folderName}}</h2> -->
    
         <div class="item-card">
       <div class="card-image">
         <div class="card_img-container">
            <img :src="$root.pictureUrl" alt="" srcset="">
         </div>
            <Upload />
       </div>
       <div class="card-body">
         <div class="item-card-header">
           <input type="text" name="name" placeholder="Название" v-model="createItem.name">
         </div>
         <div class="card-information">
           <p><input type="text" name="description" placeholder="Описание" v-model="createItem.description"></p>
           <p>Фото: <input type="text" name="image" placeholder="Фото" v-model="$root.pictureUrl"></p>
           <p>Дата покупки: <input type="text" name="purchaseDate" placeholder="Дата покупки ГГГГ-ММ-ДД" v-model="createItem.purchaseDate"></p>
           <p>Гарантия: <input type="text" name="guarantee" placeholder="гарантия" v-model="createItem.guarantee"></p>
           <p>Цена: <input type="text" name="cost" placeholder="cost" v-model="createItem.cost"></p>
           <p>Количество: <input type="text" name="count" placeholder="count" v-model="createItem.count"></p>
           <p>Хранилище: <input type="text" name="storage" placeholder="storage" v-model="createItem.storage"></p>
           <p>Папка: <input type="text" name="folder" placeholder="folder" v-model="createItem.folder"></p>
           <p><input type="text" class="d-none" name="from" placeholder="from" v-model="from" ></p>
           <input class="btn btn-primary" type="submit" value="save" @click="loading()">
         </div>
       </div>
     </div>
   </form>

  <div class="div" v-if="isLoad">
    <H1>Loading...</H1>
    <p>Please wait! Item information is writing on database</p>
  </div>
    
  </div>
</template>

<script>
import Upload from '../components/Upload.vue'

export default {
  name: 'CreateItem',
  props: {
    folderName: String
  },
  components: {
    Upload
  },
  data: function(){
    return {
      createItem: {
            name: '',
            description:'',
            image: '',
            purchaseDate: '',
            guarantee: '',
            cost: '',
            count: '',
            storage:'',
            folder: '',
            from: ''
      },
      isLoad: false
    }
  },
  methods:{
    loading(){
      this.isLoad = true
    }
  },
  computed: {
    from(){
      return this.folderName
    }
  },
  mounted(){
    var d = '2020-06-12T13:51:50.417Z'
    // var dateComponents = d.split('-')
    // console.log('date components: ', dateComponents)
    // var date = new Date(parseInt(dateComponents[0]), parseInt(dateComponents[1]), parseInt(dateComponents[2]), 0, 0, 0, 0)
    console.log(Date.parse(d))  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
