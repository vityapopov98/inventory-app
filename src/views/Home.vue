<template>
 <div class="Folders">
<h2>Главная</h2>
<div class="toolbar">
  <div class="switcher" >
  <input type="radio" name="displaySwitch" value="Folder" id="displayTable" v-model="displayMode" class="switcher_first-button">
  <label for="displayTable" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Folder'}">Folder</label>
  <input type="radio" name="displaySwitch" id="displayCards" value="Storage" v-model="displayMode" class="switcher_first-button" >
  <label for="displayCards" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Storage'}">Storage</label>
  </div>

  <button class="circleButton" @click="toggleCreateFolderComponent()">+ {{addNewFolderButton}}</button>
</div>

<CreateFolder v-if="showCreateComponent" :route="$root.place" />
<div v-if="showEditComponent">
  <button class="circleButton" @click="showEditComponent = false">Cancel</button>
  <EditFolder :route="$root.place" :id="idOfEdit" :name="nameForEdit" :icon="iconForEdit" :color="colorForEdit" @updateFolders="reloadFolders" />
</div>

<div class="message-empty-content" v-if="folders.length==0">
  <h3>Нет хранилищ!</h3>
  <p>Создайте хранилище, нажав на кнопку Add Storage</p>
</div>

     <div class="folder-container" v-if="!showCreateComponent && !showEditComponent" :key="this.$root.updateHomeView">
         <div class="folder" v-for="(folder, index) in folders" :key="index">

              <div class="dropdown show" v-if="folder.name != 'Все вещи' && folder.name != 'Корзина' && folder.name != 'Given'">
                <a class="" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#more-horizontal"/>
                  </svg>
                </a>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                  <button class="dropdown-item" @click="editFolder(index)">Редактировать</button>
                  <button class="dropdown-item" @click="deleteFolder(index)">Удалить</button>
                </div>
              </div>

             <div class="folder-image" :class="{
              'grey': folder.color == undefined,
              'blue': folder.color == 'blue', 
              'green': folder.color == 'green', 
              'indigo': folder.color == 'indigo',
              'orange': folder.color == 'orange',
              'pink': folder.color == 'pink',
              'purple': folder.color == 'purple',
              'red': folder.color == 'red', 
              'teal': folder.color == 'teal',
              'yellow': folder.color == 'yellow',
              
              'folder-image-more': folder.name != 'Все вещи' && folder.name != 'Корзина' && folder.name != 'Given',
              }">
              
                 <img v-if="folder.image != undefined" :src="require(`@/assets/${folder.image}`)" alt="">
             </div>

              <router-link :to="{ name: 'Items', params: { from: `-${folder.name}`}}" v-if="displayMode=='Storage'">
                <h2 class="folder-header">{{folder.name}}</h2>
              </router-link>

              <router-link :to="{ name: 'Items', params: { from: folder.name}}" v-if="displayMode=='Folder'">
                <h2 class="folder-header">{{folder.name}}</h2>
              </router-link>
             <p class="folder-item-count">15 items</p>
         </div> 
     </div>
 </div>
</template>

<script>
import CreateFolder from '../components/CreateFolder.vue'
import EditFolder from "../components/EditFolder.vue";

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    CreateFolder,
    EditFolder
  },
  data: function(){
    return {
      //folders - это массив с папками или хранилищами
      folders:[{
          name: 'Все вещи'
      },{
          name: 'Корзина'
      },{ 
          name: 'Given'
      }],
      searchString: '',
      displayMode: this.$root.place,
      addNewFolderButton: 'Add Folder',
      showCreateComponent: false,
      showEditComponent: false,

      idOfEdit: Number,
      nameForEdit: '',
      iconForEdit: '',
      colorForEdit: '',
    }
  },
  watch: {
    displayMode: function(newMode, oldMode){
      if(newMode == 'Storage'){
        this.requestStorages()
        console.log(oldMode)
        this.$root.place = 'Storage'
      }
      else if (newMode == 'Folder'){
        this.requestFolders()
        this.$root.place = 'Folder'
      }
    },
    showEditComponent(newShowState, oldShowState){
      if(newShowState == false && oldShowState == true){
        //создали и выключили
        this.loadFolders()
      }
    }
  }, 
  methods:{
    loadFolders: function(){
      console.log('loading.. folders')
      if(this.displayMode == 'Storage'){
        this.requestStorages()
      }
      else if (this.displayMode == 'Folder'){
        this.requestFolders()
      }
      
    },
    reloadFolders(hide){
      console.log('im working')
      this.showEditComponent = hide;
      this.loadFolders();
    },
    requestStorages(){
      fetch(`/api/get-storages`, {
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }).then(res=>{
        console.log('here')
            if(res.ok){
                var data = res.json();
                console.log(data);
                return data;
            }
            else{
                console.log('er get rooms :(');
                throw new Error ('er');
            }
        }).then(data=>{
            console.log(data);
            this.folders = data;
        })
    },
    requestFolders(){
      fetch(`/api/get-folders`, {
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }).then(res=>{
        console.log('here')
            if(res.ok){
                var data = res.json();
                console.log(data);
                return data;
            }
            else{
                console.log('er get rooms :(');
                throw new Error ('er');
            }
        }).then(data=>{
            console.log(data);
            const systemFolders = [
              {
                name: 'Все вещи',
                image: 'icon-all.png',
                color: 'blue'
              },{
                name: 'Корзина',
                image: 'icon-trash.png',
                color: 'red'
              },{ 
                name: 'Given',
                image: 'icon-book.png',
                color: 'indigo'
              }
            ]
            
            this.folders = systemFolders;
            this.folders.push(...data)
        })
    },
    editFolder(index){
      // alert(index)
      this.idOfEdit = this.folders[index].id
      this.nameForEdit = this.folders[index].name
      this.iconForEdit = this.folders[index].image
      this.colorForEdit = this.folders[index].color
      this.showEditComponent = true
      // this.$root.showEditComponent = true
    },
    deleteFolder(index){
      var result =  prompt('Are you sure you want to remove the folder? All items will be deleted! Type: yes. And confirm ')
        var data = {
            folder: this.folders[index].id
        }
        if(result == 'yes'){
          if(this.displayMode == 'Storage'){
            fetch('/api/delete-storage', {
              method: 'DELETE',
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
              body: JSON.stringify(data)
            }).then(res=>{
                console('ok')
                return res.json()
            }).then(data=>{
                console(data)
                this.loadFolders()
            })
          }
          else{
            fetch('/api/delete-folder', {
              method: 'DELETE',
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
              body: JSON.stringify(data)
            }).then(res=>{
                console('ok')
                return res.json()
            }).then(data=>{
                console(data)
                this.loadFolders()
            })
          }
          
        }
        else{
          alert('Incorrect')
        }
    },
    toggleCreateFolderComponent(){
      if(this.addNewFolderButton == 'Add Folder'){
        this.showCreateComponent = true
        this.addNewFolderButton = 'Cancel'
      }
      else{
        this.showCreateComponent = false
        this.addNewFolderButton = 'Add Folder'
      }
    } 
        
  },
  mounted(){
        this.loadFolders();
  },
  computed: {
    filteredEvents: function(){
      var eventsArray = this.eventCards;
      var searchString = this.searchString;

      if (!searchString) {
        return eventsArray;
      }

      searchString = searchString.trim().toLowerCase();

      eventsArray = eventsArray.filter(function(item){
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      })

      return eventsArray;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Folders{
    padding-top: 3rem ;
}
.message-empty-content{
  padding: 2rem;
  text-align: center;
  color: #676767;
}
.folder-container{
    display: flex;
    flex-flow: row wrap;
    justify-content: center; 
}
.folder{
    /* background-color: rgb(255, 255, 255); */
    border: 1px solid #aeaeae;
    border-radius: 20px;
    height: 209px;
    width: 169px;
    margin: 1rem;
    padding: .6rem 1rem 1rem 1rem;
}
@media(prefers-color-scheme: light){
  .folder{
    background-color: white;
    color: rgb(28, 29, 30);
  }
}
@media(prefers-color-scheme: dark){
  .folder{
    background-color:rgb(44, 44, 46) !important;
    border: 1px solid rgb(58, 58, 60) !important;
  }
  h2.folder-header{
    color: white !important;
  }
}
.dropdown{
  display: flex;
  justify-content: flex-end;
}
.folder-header{
    font-size: 1.2rem;
    font-weight: 700;
    text-align: left;
}
.folder-image{
    flex-direction: column;
    align-items: center;
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin:  21px auto .5rem auto;
}
.folder-image-more{
  margin: 0 auto .5rem;
}
.folder-image>img{
  height: 100px;
    width: 100px;
}
@media(max-width: 640px){
  .folder{
    width: calc(50% - 2rem);
  }
  .folder-image, .folder-image>img{
    height: 80px;
    width: 80px;
  }
  .toolbar{
    flex-direction: row;
  }
}
.blue{
  background-color: rgb(0, 122, 255);
}
.green{
  background-color: rgb(52, 199, 89);
}
.indigo{
  background-color: rgb(88, 86, 214);
}
.orange{
  background-color: rgb(255, 149, 0);
}
.pink{
  background-color: rgb(255, 45, 85); 
}
.purple{
  background-color: rgb(175, 82, 222);
}
.red{
  background-color: rgb(255, 59, 48);
}
.teal{
  background-color: rgb(90, 200, 250);
}
.yellow{
  background-color: rgb(255, 204, 0);
}
.grey{
  background-color: #aeaeae;
}
.light-grey{
  background-color: #e8e8e8;
}

@media(max-width:800px){
    #sidebar-nav{
        width: 100%;
        z-index: 10;
    }
    .s-hidden{
        display: none !important;
    }
    .s-open{
        display: block;
    }
   
}
</style>
