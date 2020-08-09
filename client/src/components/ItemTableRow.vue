<template>
<!-- <table class="table table-striped table-sm">
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
  <tbody> -->
    <tr >
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
  <!-- </tbody> -->
<!-- </table> -->
</template>

<script>
export default {
  name: 'ItemTableRow',
  props: {
    item:{
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
  },
  data: function(){
    return {
    
    }
  },
  methods: {
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
  }
  //лежало в Items.vue
          // edit(index){
        //   var row = this.$refs.items[index] //getting tables row

        //   console.log(row.childNodes[9])//ячейка с кнопками в строке
        //   var isEdit ='';

        //   //Меняем надпись на кнопке
        //   if(row.childNodes[9].childNodes[0].innerText == 'Edit'){
        //     row.childNodes[9].childNodes[0].innerText = 'Done';
        //     isEdit = true;
        //   }
        //   else{
        //     row.childNodes[9].childNodes[0].innerText = 'Edit';
        //     isEdit = false;
        //   }

        //   //прогоняем по всем ячейкам и берем только инпуты
        //   row.childNodes.forEach(element => {
        //     console.log(element.childNodes)
        //     if(element.childNodes[0].nodeName == 'INPUT'){
        //       if(isEdit){
        //         element.childNodes[0].removeAttribute('disabled');
        //       }
        //       else{
        //         element.childNodes[0].setAttribute('disabled', "disabled");

        //       }
        //     }
        //   });

        //   if (!isEdit) {
        //     this.updateItemInformation(index)
        //   }
        // },
        // cardEdit(index){
        //   if (this.cardEditBtnStatus === '') {
        //     this.cardEditBtnStatus = index;
        //     this.cardEditBtnLabel = 'Done';
        //   }
        //   else{
        //     this.cardEditBtnStatus = '';
        //     this.cardEditBtnLabel = '';
        //     this.updateItemInformation(index)
        //   }
        // },
        // updateItemInformation(index){
        //     var curItem = {
        //                 id: Number,
        //                 name: '',
        //                 description:'',
        //                 image: '',
        //                 purchaseDate: '',
        //                 guarantee: '',
        //                 cost: '',
        //                 count: '',
        //                 storage:''
        //               }
        //         curItem.id = this.items[index].id;
        //         curItem.name = this.items[index].name;
        //         curItem.description = this.items[index].description;
        //         curItem.image = this.items[index].image;
        //         curItem.purchaseDate = this.items[index].purchaseDate;
        //         curItem.guarantee = this.items[index].guarantee;
        //         curItem.cost = this.items[index].cost;
        //         curItem.count = this.items[index].count;
        //         curItem.storage = this.items[index].storage.name;
        //     fetch('/api/update-item', {
        //             method: 'PUT',
        //             headers:{
        //               'Content-Type': 'application/json',
        //               'Accept': 'application/json'
        //             },
        //             body: JSON.stringify(curItem)
        //           }).then(res=>{
        //             return res.json();
        //           }).then(data=>{
        //             console.log('data', data);
        //             this.loadItems();
        //           })
        // },

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
