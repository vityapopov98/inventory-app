<template>
 <div class="Folders">
<h2>Пользователи</h2>
<!-- <div class="toolbar">
  <div class="switcher" >
  <input type="radio" name="displaySwitch" value="Folder" id="displayTable" v-model="displayMode" class="switcher_first-button">
  <label for="displayTable" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Folder'}">Folder</label>
  <input type="radio" name="displaySwitch" id="displayCards" value="Storage" v-model="displayMode" class="switcher_first-button" >
  <label for="displayCards" class="switcher_first-button-label" :class="{'sitcher_active-label': displayMode == 'Storage'}">Storage</label>
  </div>

  <button class="circleButton" @click="toggleCreateFolderComponent()">+ {{addNewFolderButton}}</button>
</div> -->

<div class="message-empty-content" v-if="users.length==0">
  <h3>Нет хранилищ!</h3>
  <p>Создайте хранилище, нажав на кнопку Add Storage</p>
</div>
  <div class="table-responsive">
            <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>login</th>
              <th>Password</th>
              <th>Role</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody v-for="user in users" :key="user.id">
            <td>
              {{user.id}}
            </td>
            <td>
              <input type="text" v-model="user.name" disabled="true">
            </td>
            <td>
              <input type="text" v-model="user.login" disabled="true">
            </td>
            <td>
              <input type="text" v-model="user.password" disabled="true">
            </td>
            <td>
              <input type="text" v-model="user.role" disabled="true">
            </td>
            <td>
             <button @click="edit(index)">Edit</button>
             <button @click="deleteItem(index)">Delete</button>
            </td>
          </tbody>
        </table>
          </div>
    
 </div>
</template>

<script>


export default {
  name: 'Users',
  props: {
    msg: String
  },
  
  data: function(){
    return {
      //folders - это массив с папками или хранилищами
      users:[],
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
   
  methods:{
    loadUsers: function(){
      fetch(`/api/get-users`, {
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
            this.users = data;
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
    
        
  },
  mounted(){
        this.loadUsers();
  },
  
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
    background-color: rgb(255, 255, 255);
    border: 1px solid #aeaeae;
    border-radius: 20px;
    height: 209px;
    width: 169px;
    margin: 1rem;
    padding: .6rem 1rem 1rem 1rem;
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
