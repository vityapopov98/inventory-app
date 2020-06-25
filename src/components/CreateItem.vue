<template>
  <div class="CreateItem">
    <form action="/api/create-item" method="post">
    
         <div class="item-card">
       <div class="card-image">
         <div class="card_img-container">
         <img :src="createItem.image" alt="" srcset="">
         </div>
       </div>
       <div class="card-body">
         <div class="item-card-header">
           <input type="text" name="name" placeholder="name" v-model="createItem.name">
         </div>
         <div class="card-information">
           <p><input type="text" name="description" placeholder="description" v-model="createItem.description"></p>
           <p>Image: <input type="text" name="image" placeholder="image" v-model="createItem.image"></p>
           <p>Purchase Date: <input type="text" name="purchaseDate" placeholder="purchaseDate" v-model="createItem.purchaseDate"></p>
           <p>Guarantee: <input type="text" name="guarantee" placeholder="guarantee" v-model="createItem.guarantee"></p>
           <p>Cost: <input type="text" name="cost" placeholder="cost" v-model="createItem.cost"></p>
           <p>Count: <input type="text" name="count" placeholder="count" v-model="createItem.count"></p>
           <p>Storage: <input type="text" name="storage" placeholder="storage" v-model="createItem.storage"></p>
           <input class="btn btn-primary" type="submit" value="save">
         </div>
       </div>
     </div>
   </form>

    
  </div>
</template>

<script>
export default {
  name: 'CreateItem',
  // props: {
  //   folderName: String
  // },
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
            storage:''
      }
    }
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
