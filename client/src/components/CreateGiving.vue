<template>
  <div class="card-giving-information">
    <form v-show="!isLoad">
    <!-- <h2>{{folderName}}</h2> -->
    
    <p>Кто дал: <input type="text" v-model="createdGiving.whoGave"></p>
      <p>Кому дал: <input type="text"  v-model="createdGiving.whoTake" ></p>
      <p>Телефон получателя: <input type="text" v-model="createdGiving.whoTakePhone"></p>
      <p>Дата выдачи: <input type="text" v-model="createdGiving.givingDate" placeholder="YYYY-MM-DD"></p>
      <p>Ожидаемая дата возврата: <input type="text" v-model="createdGiving.returnDate" placeholder="YYYY-MM-DD"></p>
      <p>Залог: <input type="text" v-model="createdGiving.pledge" placeholder="Цифры"></p>
      <button class="circleButton" @click="loading($event)">Отдать</button>
   </form>
  <div  v-if="isLoad">
    <H1>Сохранено</H1>
    <p>можете заверишить редактирование, нажав на кнопку Done</p>
  </div>
    
  </div>
</template>

<script>


export default {
  name: 'CreateGiving',
  props: {
    folderName: String
  },
  data: function(){
    return {
      isLoad: false,
      createdGiving:{
        whoGave: '',
        whoTake: '',
        whoTakePhone: '',
        givingDate : '',
        returnDate: '',
        pledge: ''
      }
    }
  },
  methods:{
    loading(event){
      if(event){
        event.preventDefault();
      }
      this.isLoad = true
      fetch('/api/create-giving', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.$root.accessToken}`
            },
            body: JSON.stringify(this.createdGiving)
          }).then(res=>{
            console.log(res)
            return res.json()
          }).then(data=>{
            console.log(data)
            this.$root.givingId = data
            //отправить запрос на обновление данных
            this.$emit('givingCreated')
          })
    }
  },
  computed: {
    from(){
      return this.folderName
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
