<template>
 <div class="Items">
   <h2>Items</h2>
   
   

<div class="toolbar">
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

<CreateItem v-if="showCreateComponent"/>

   <div class="card-block" v-if="displayMode=='Cards' && !showCreateComponent">

     <div class="item-card" v-for="(item, index) in filteredItems" :key="index">
       <div class="card-image">
         <div class="card_img-container">
         <img :src="item.image" alt="" srcset="">
         </div>
       </div>
       <div class="card-body">
         <div class="item-card-header">
           <input type="text" class="item-card-header" v-model="item.name" :disabled="cardEditBtnStatus!==index">
           <button v-on:click="cardEdit(index)" class="card-edit-button">
             {{cardEditBtnLabel}}
             <svg class="feather">
                <use xlink:href="@/assets/feather-sprite.svg#edit"/>
             </svg>
           </button>
           <button @click="deleteItem(index)" class="card-delete-button">
             <svg class="feather">
                <use xlink:href="@/assets/feather-sprite.svg#trash"/>
             </svg>
           </button>
         </div>
         <div class="card-information">
           <p><input type="text" v-model="item.description" :disabled="cardEditBtnStatus!==index"></p>
           <p>Purchase Date: <input type="text" v-model="item.purchaseDate" :disabled="cardEditBtnStatus!==index"></p>
           <p>Guarantee: <input type="text" v-model="item.guarantee" :disabled="cardEditBtnStatus!==index"></p>
           <p>Cost: <input type="text" v-model="item.cost" :disabled="cardEditBtnStatus!==index"></p>
           <p>Count: <input type="text" v-model="item.count" :disabled="cardEditBtnStatus!==index"></p>
           <p>Storage: <input type="text" v-model="item.storage.name" :disabled="cardEditBtnStatus!==index"></p>
         </div>
       </div>
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
            <tr v-for="(item, index) in filteredItems" :key="index" ref="items" >
              <td>{{item.id}}</td>
              <td>
                <input type="text" v-model="item.name" disabled="true">
              </td>
              <td>
                <input type="text" v-model="item.description" disabled="true">
              </td>
              <td>
                <input type="text" v-model="item.image" disabled="disabled">
              </td>
              <td>
                <input type="text" v-model="item.purchaseDate" disabled="disabled">
              </td>
              <td>
                <input type="text" v-model="item.guarantee" disabled="disabled">
              </td>
              <td>
                <input type="text" v-model="item.cost" disabled="disabled">
              </td>
              <td>
                <input type="text" v-model="item.count" disabled="disabled">
              </td>
              <td>
                <input type="text" v-model="item.storage.name" disabled="disabled">
              </td>
              <td>
                <button @click="edit(index)">Edit</button>
                <button @click="deleteItem(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
          </div>
      </div>
</template>

<script>
import CreateItem from '../components/CreateItem.vue'

export default {
  name: 'Items',
  components: {
    CreateItem
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
        storage:''
      },],
      displayMode: 'Cards',
      cardEditBtnStatus: '',
      cardEditBtnLabel: '',
      searchString: '',
      routeFolderName: this.$route.params.folder,
      filterName: 'name',
      showCreateComponent: false,
      addNewItemButton: 'Add Item'
    }
  },
  methods:{
    loadItems(folder){
          if (folder ==''){
              fetch('api/get-item-all',{
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }).then(res=>{
              var s= res
              console.log(s)

              return s.json()
            }).then(data=>{
              console.log(data)
              this.items = data
            })
          }
          else{
            var storage = {
              name: folder
            }
            console.log('this is storage: ', folder)
            fetch(`api/get-item`,{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(storage)
            }).then(res=>{
              var s= res
              console.log(s)

              return s.json()
            }).then(data=>{
              console.log(data)
              this.items = data
            })
          }
        },
        toggleCreateComponent(){
          if(this.showCreateComponent == false){
            this.showCreateComponent = true;
            this.addNewItemButton = 'Cancel'
          }
          else{
            this.showCreateComponent = false;
            this.addNewItemButton = 'Add Item'
          }
        },
        edit(index){
          var row = this.$refs.items[index] //getting tables row

          console.log(row.childNodes[9])//ячейка с кнопками в строке
          var isEdit ='';

          //Меняем надпись на кнопке
          if(row.childNodes[9].childNodes[0].innerText == 'Edit'){
            row.childNodes[9].childNodes[0].innerText = 'Done';
            isEdit = true;
          }
          else{
            row.childNodes[9].childNodes[0].innerText = 'Edit';
            isEdit = false;
          }

          //прогоняем по всем ячейкам и берем только инпуты
          row.childNodes.forEach(element => {
            console.log(element.childNodes)
            if(element.childNodes[0].nodeName == 'INPUT'){
              if(isEdit){
                element.childNodes[0].removeAttribute('disabled');
              }
              else{
                element.childNodes[0].setAttribute('disabled', "disabled");

              }
            }
          });

          if (!isEdit) {
            this.updateItemInformation(index)
          }
        },
        cardEdit(index){
          if (this.cardEditBtnStatus === '') {
            this.cardEditBtnStatus = index;
            this.cardEditBtnLabel = 'Done';
          }
          else{
            this.cardEditBtnStatus = '';
            this.cardEditBtnLabel = '';
            this.updateItemInformation(index)
          }
        },
        updateItemInformation(index){
            var curItem = {
                        id: Number,
                        name: '',
                        description:'',
                        image: '',
                        purchaseDate: '',
                        guarantee: '',
                        cost: '',
                        count: '',
                        storage:''
                      }
                curItem.id = this.items[index].id;
                curItem.name = this.items[index].name;
                curItem.description = this.items[index].description;
                curItem.image = this.items[index].image;
                curItem.purchaseDate = this.items[index].purchaseDate;
                curItem.guarantee = this.items[index].guarantee;
                curItem.cost = this.items[index].cost;
                curItem.count = this.items[index].count;
                curItem.storage = this.items[index].storage.name;
            fetch('/api/update-item', {
                    method: 'PUT',
                    headers:{
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify(curItem)
                  }).then(res=>{
                    return res.json();
                  }).then(data=>{
                    console.log('data', data);
                    this.loadItems();
                  })
        },
        deleteItem(index){
          var itemId = {
            id: this.items[index].id
          };
          fetch('/api/delete-item', {
            method: 'DELETE', 
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(itemId)
          }).then(()=>{
            // if(res.status == 200){

            // }
            this.loadItems(this.routeFolderName)
          })
        }
  },
  mounted(){
    // alert('i am ready')
        this.loadItems(this.routeFolderName);
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
  /* justify-content: space-between; */
}
.search input{
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
  width: 10rem;
  height: 2.5rem;
  background-color: #f1f1f1;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1.5rem;
  /* border: 3px solid #aeaeae; */
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
.item-card-header input{
  font-size: 2rem;
  font-weight: 500;
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
.item-card-header{
  display: flex;
}
.item-card-header input{
  flex-grow: 1;
}
.card-body{
  width: 80%;
}
.event-card_hr{
    border: 0.5px solid #d7d7d7;
    margin: 2rem 0;
}
.card_img-container{
    width: 260px;
    height: 260px;
    margin: auto;
    overflow: hidden;
    border-radius: 1rem;
    margin-bottom: 2rem;
    background-color: #ff004d;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card_img-container>img{
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
.toolbar{
    padding: 0rem 1rem 3rem;
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
