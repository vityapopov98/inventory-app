<template>
 <div class="Folders">
<h2>Folders</h2>
<div class="toolbar">
  <div class="search" v-if="!showCreateComponent">
    <input type="text" v-model="searchString" placeholder="Search">
    <!-- <input type="text" v-model="filterName" placeholder="filter"> -->
  </div>

  <div class="switcher" v-if="!showCreateComponent">
  <input type="radio" name="displaySwitch" id="displayCards" value="Storage" v-model="displayMode" class="switcher_first-button">
  <label for="displayCards" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Storage'}">Storage</label>
  <input type="radio" name="displaySwitch" value="Folder" id="displayTable" v-model="displayMode" class="switcher_first-button">
  <label for="displayTable" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Folder'}">Folder</label>
  </div>

  <button class="circleButton" @click="toggleCreateComponent()">+ {{addNewItemButton}}</button>
</div>

     <div class="folder-container">
         <div class="folder" v-for="(folder, index) in folders" :key="folder.id">

             <div class="folder-image">
                 <!-- <img src="" alt=""> -->
             </div>
          <router-link :to="{ name: 'Items', params: { folder: folder.name }}">
             <h2 class="folder-header">{{folder.name}}</h2>
          </router-link>
             <p class="folder-item-count">
15 items
             <button @click="deleteFolder(index)" class="card-delete-button">
             <svg class="feather">
                <use xlink:href="@/assets/feather-sprite.svg#trash"/>
             </svg>
           </button>
             </p>

          
          
         </div>
     </div>
 </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data: function(){
    return {
      folders:[{
          id: 1,
          name: 'Медиа'
      },{
          id: 2,
          name: 'Кухня'
      },{
          id: 3,
          name: 'Спорт'
      },{
          id: 4,
          name: 'Кэмпинг'
      },{
          id: 5,
          name: 'Lbk'
      }],
      searchString: '',
      displayMode: 'Storage'
    }
  },
  methods:{
    loadFolders: function(){
            console.log('loading.. folders')
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
          deleteFolder(index){
              alert(index)
              var data = {
                  folder: this.folders[index].id
              }
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
          },
        //   setCurrentEvent(eventID){
        //     alert('событие установленно')
        //     fetch(`/api/set-current-event-by-id?user=admin&event=${eventID}`, {
        //         headers : { 
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         }
        //     }).then(res=>{
        //       console.log('here')
        //           if(res.ok){
        //               // var data = res.json();
        //               console.log(res);
        //               return res;
        //           }
        //           else{
        //               console.log('er get rooms :(');
        //               throw new Error ('er');
        //           }
        //       }).then(data=>{
        //           console.log(data);
        //       })
        //   }
        
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Folders{
    padding-top: 3rem ;
}
.folder-container{
    /* padding-top: 1rem; */
    display: flex;
    flex-flow: row wrap;
    /* background-color: blueviolet; */
    justify-content: center; 
}
.folder{
    background-color: rgb(255, 255, 255);
    border: 1px solid #aeaeae;
    border-radius: 20px;
    height: 209px;
    width: 169px;
    margin: 1rem;
    padding: 1rem;
    /* display: flex; */
    /* flex-direction: column;
    align-items: center; */
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
    background-color: blueviolet;
    margin: .7rem auto;
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
