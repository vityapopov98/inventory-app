<template>
  <div class="CreateItem">
    <form :action="url" method="post" v-show="!isLoad">
    
    
        <div class="create-folder">
       <div class="card-image">
         <div class="folder_img-container" :class="color">
          <img :src="require(`@/assets/${icon}`)" alt="" srcset="">
         </div>
       </div>
       <div class="card-body">
         <div class="folder-card-header">
           <input type="text" name="name" placeholder="Имя папки">
         </div>

           <div class="folder-icon-select">
             <div v-for="iconItem in iconsArray" :key="iconItem">
                <input type="radio" :value="iconItem" v-model="icon" name="icon" :id="iconItem">
                <label :for="iconItem">
                  <div class="folder-icon_img-container" :class="color">
                    <img :src="require(`@/assets/${iconItem}`)" alt="">
                  </div>
                </label>
             </div>
           </div>

          <h5>Выбирите цвет: </h5>
           <div class="folder-color-select">
             <div v-for="colorItem in colorsArray" :key="colorItem">
                <input type="radio" class="folder-color-input" name="color" :value="colorItem" v-model="color" :id="`${colorItem}-folder-color`">
                <label :for="`${colorItem}-folder-color`">
                  <div class="folder-color-outline" :class="[color == colorItem ? colorItem : 'light-grey']">
                    <div class="folder-color" :class="colorItem"></div>
                  </div>
                </label>
             </div>
           </div>

          <input class="btn btn-primary" type="submit" value="save" @click="loading()">

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
export default {
  name: 'CreateFolder',
  props: {
    route: String
  },
  data: function(){
    return {
      createFolder:{
        name: '', 
        image: ''
      },
      isLoad: false,
      color: 'blue',
      icon: 'icon-all.png',
      iconsArray: [
        'icon-all.png',
        'icon-box.png',
        'icon-music.png',
        'icon-coffee.png',
        'icon-compass.png',
        'icon-briefcase.png',
        'icon-book.png',
        'icon-home.png',
        'icon-columns.png',
        'icon-truck.png'
      ],
      colorsArray: [
        'blue',
        'green',
        'indigo',
        'orange',
        'pink',
        'purple',
        'red',
        'teal',
        'yellow'
      ],
      
    }
  },
  methods:{
    loading(){
      this.isLoad = true
    }
  },
  computed:{
    url(){
      console.log('this is route: ', this.route)
      var url = ''
      if(this.route == 'Folder'){
        url = '/api/create-folder'
        return url
      }
      else {
        url = '/api/create-storage'
        return url
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* h3 {
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
} */
.create-folder{
    width: 100%;  
    margin: 1rem 0;
    display: flex;
    flex-flow: row wrap;
    border: 1px solid #c0c0c0;
    border-radius: 20px;
}
.folder-icon_img-container{
  height: 50px;
  width: 50px;
  border-radius: 40px;
  /* background-color: #aeaeae; */
}
.folder-icon_img-container>img, .folder-color{
  height: 50px;
  width: 50px;
}
.folder-color{
  display: flex;
  border-radius: 40px;
  padding: .1rem;
  border: 3px solid #ffffff;
  /* outline: #42b983; */
}
.folder-color{
  height: 29px;
  width: 29px;
}
.folder-color-outline{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 40px;
}
.folder-icon-select, .folder-color-select{
  padding: 1rem 0;
  display: flex;
  flex-flow: row wrap;
}
input.folder-color-input, .folder-icon-select input{
  opacity: 0;
}
@media(max-width: 640px){
  .card-image{
    width: 100%
  }
  .folder_img-container{
    width: 100px;
    height: 100px;
    margin-bottom: 0;
  }
}
</style>
