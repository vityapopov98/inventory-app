<template>
 <div class="Items">
   <h2>{{routeFolderName}}</h2>
   
<div class="toolbar">
  <router-link class="circleButton" to="/">
    <svg class="feather">
      <use xlink:href="@/assets/feather-sprite.svg#arrow-left"/>
    </svg>
  </router-link>
  
  <div class="search" v-if="!showCreateComponent">
    <input type="text" v-model="searchString" placeholder="Search">
    <!-- <input type="text" v-model="filterName" placeholder="filter"> -->
  </div>

  <div class="switcher" v-if="!showCreateComponent">
  <input type="radio" name="displaySwitch" id="displayCards" value="Cards" v-model="displayMode" class="switcher_first-button">
  <label for="displayCards" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Cards'}">Cards</label>
  <input type="radio" name="displaySwitch" value="Table" id="displayTable" v-model="displayMode" class="switcher_first-button">
  <label for="displayTable" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Table'}">Table</label>
  </div>

  <button class="circleButton" @click="toggleCreateComponent()">+ {{addNewItemButton}}</button>
</div>

<CreateItem :folderName="routeFolderName"  v-if="showCreateComponent"/>

<div class="message-empty-content" v-if="items.length==0">
  <h3>Нет вещей!</h3>
  <p>Создайте вещи, нажав на кнопку Add Item</p>
</div>

   <div class="card-block" v-if="displayMode=='Cards' && !showCreateComponent">

     <div v-for="(item, index) in filteredItems" :key="index">
       <ItemCard :item="item" :index="index" :fromPlace="routeFolderName" @reloadCards="loadItems(routeFolderName)" />
     </div>
   </div>
          <div class="table-responsive" v-if="displayMode=='Table' && !showCreateComponent">
            <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Purchase Date</th>
              <th>Guarantee</th>
              <th>Cost</th>
              <th>Count</th>
              <th>Storage</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            <ItemTableRow :item="item" v-for="(item, index) in filteredItems" :key="index" ref="items" />
          </tbody>
        </table>
          </div>
      </div>
</template>

<script>
import CreateItem from '../components/CreateItem.vue'
import ItemCard from '../components/ItemCard.vue'
import ItemTableRow from '../components/ItemTableRow.vue'


export default {
  name: 'Items',
  components: {
    CreateItem, 
    ItemCard,
    ItemTableRow
  },
  data: function(){
    return {
      items:[{
        id: Number,
        name: '',
        description:'',
        image: '',
        purchaseDate: '',
        guarantee: '',
        cost: '',
        count: '',
        storage:'',
        folder: ''
      },],
      displayMode: 'Cards',
      searchString: '',
      routeFolderName: this.$route.params.from,
      filterName: 'name',
      showCreateComponent: false,
      addNewItemButton: 'Add Item',
      
    }
  },
  methods:{
    loadItems(fromHere){
      console.log(fromHere)
      this.requests.loadItems(fromHere).then(result=>{

        this.items = result
       console.log('result: ', result)
      }).catch(er=>{
        console.log(er)
      })
    },
    toggleCreateComponent(){
      if(this.showCreateComponent == false){
        this.showCreateComponent = true;
        this.addNewItemButton = 'Cancel'
      }
      else{
        this.$emit('delete-preview')
        this.showCreateComponent = false;
        this.addNewItemButton = 'Add Item'
      }
    },
  },
  mounted(){
    this.loadItems(this.routeFolderName);
    //Сбрасываем url фотки
    this.$root.pictureUrl = ''
  },
  computed: {
    filteredItems: function(){
      var itemsArray = this.items;
      var searchString = this.searchString;

      if (!searchString) {
        return itemsArray;
      }

      searchString = searchString.trim().toLowerCase();

      if (this.filterName == 'name'){
        itemsArray = itemsArray.filter(function(item){
          if (item.name.toLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        })
      }
      else if (this.filterName == 'storage'){
        itemsArray = itemsArray.filter(function(item){
          if (item.storage.name.toLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        })
      }

      return itemsArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Items{
  padding-top: 3rem;
}
/* __________toolbar________ */
.toolbar{
  display: flex;
  padding: 0rem  0rem 3rem;
  /* justify-content: space-between; */
}
.search input{
  margin: 0 1rem;
  width: 500px;
  padding: .5rem 1.5rem;
  border-radius: 40px;
  border: 1px solid #aeaeae;
}
.search input:focus{
  border: 1px solid #2c44ff;
  outline: none;
}
/* __________Switcher_______ */
.switcher{
  margin-right: 1rem;
  width: 10rem;
  height: 2.5rem;
  background-color: #f1f1f1;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.switcher_first-button{
  height: 0;
  width: 0%;
}
.switcher_first-button-label{
  cursor: pointer;
  padding: .5rem;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 3px solid #f1f1f1;
  margin: 0%;
  text-align: center;
}
.sitcher_active-label{
  background: rgb(255, 255, 255);
  border-radius: 40px;
  border: 3px solid #f1f1f1;
  text-align: center;
}
.circleButton{
  display: flex;
  align-items: center;
  height: 2.5rem;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  border: 3px solid #f1f1f1;
  text-align: center;
  padding:  0 1rem;
}
.circleButton:focus{
  outline: none;
}


/* ____________Card___________ */
.item-card{
    width: 100%;  
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    border: 1px solid #c0c0c0;
    border-radius: 20px;
}
.item-card-header input, .folder-card-header input{
  font-size: 2rem;
  font-weight: 500;
  flex-grow: 1;
}
 .folder-card-header input{
   border: none;
 }
.item-card input:disabled{
  border: none;
  background-color: white;
}
.item-card input{
  border: none;
  /* border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #aeaeae; */
  width: 70%;
}
.card-image{
  padding: 22px;
}
.item-card-header, .folder-card-header{
  display: flex;
}

.card-body{
  width: 80%;
}
.event-card_hr{
    border: 0.5px solid #d7d7d7;
    margin: 2rem 0;
}
.card_img-container, .folder_img-container{
    width: 260px;
    height: 260px;
    margin: auto;
    overflow: hidden;
    border-radius: 1rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card_img-container{
  background-color: #c0c0c0;
}
.card_img-container>img, .folder_img-container>img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
/* Buttons on card */
.card-edit-button, .card-delete-button{
  border: none;
  background: none;
  outline: none;
}
.card-edit-button:active, .card-delete-button:active, .card-edit-button:focus, .card-delete-button:focus{
  outline: none;
}
.card-edit-button .feather:hover{
  stroke: #11bf20;
}
.card-delete-button .feather:hover{
  stroke: rgb(255, 44, 29);
}
.event-card_img-container>input{
    outline:0;
    opacity:0;
    cursor: pointer;
    position: absolute;
}
p.event-card_description{
  width: 80%;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.events-toolbar>input{
    border-radius: 5rem;
    border: 1px solid #999;
    padding: .3rem 1.2rem;
    margin-right:  1rem;

    /* background-color: #f2f2f2; */
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
    .signInBlock{
      padding: 7rem 0;
    }
    .signInBlock_form{
      width: 100%;
      margin: 0;
      padding: 2rem;
    }

    .events-toolbar>input{
      width: 60%;
      padding: .5rem 0 .5rem 1rem;
      margin-right:  .5rem;
      border-style:solid;
      border: 1px solid #d7d7d7 !important;
      outline: none;
      inset: none !important;
      background: white;
      box-shadow: none;
    }

    /* toolbar */
    .toolbar{
      flex-flow: row wrap;
    }
    .search{
      margin-bottom: 1rem;
    }
    .search input{
      width: 100%;
    }
    /* карточки */
    .item-card{
      flex-direction: column;
    }
    .card-image{
      padding-bottom: 0;
    }
    .card-body{
      width: 100%;
      padding-top: 0;
    }
    .item-card-header>input{
      font-size: 1.5rem;
      font-weight: 600;
    }
}
.feather {
  width: 1.1rem;
  height: 1.1rem;
  stroke: #848484;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
a.router-link-exact-active>.feather{
  stroke: #ff004d;
}
</style>
