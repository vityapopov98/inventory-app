<template>
    <div class="signInBlock">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Log in</h2>
            <div class="signInBlock_form">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="text" class="form-control" name="login" id="login" aria-describedby="emailHelp" placeholder="Enter email" v-model="login">
                  <small id="emailHelp" class="form-text text-muted" :class="{'invalid-feedbak': displayError}">{{loginErrorMessage}}</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="password">
                </div>
                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-danger btn-rounded" v-on:click="signin($event)">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//Для входа в систему
// login: login111
// password: 111111_2

export default {
  name: 'Login',
  components: {
      
  },
  data: function(){
      return {
        login: '',
        password: '',
        displayError: false, 
        loginErrorMessage: '', 

      }
  },
  methods:{
    
      signin(event){
        if(event){
          event.preventDefault()
        }
        //отослать запрос на сервер как в App.vue signIn()
        //получить ответ от сервера ( токен)
        //поместить токен в localStorage
        //сделать редирект на главную this.$router.replace('home')
       var data = {
         login: this.login,
        password: this.password
      }
      // отправить на сервер
      fetch('/api/sign-in',{
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
        method: 'POST',              // метод POST 
        body: JSON.stringify(data),  // типа запрашиаемого документа
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res=>{
        var data = res.json()
        return data
      }).then(data=>{
        console.log(data)
        if(data.hash == 'No user found'){
          this.displayError = true
          this.loginErrorMessage = 'No user found'
        }
        else if(data.hash == ''){
          this.displayError = true
          this.loginErrorMessage = 'Incorrect'
        }
        else{
          //Все хорошо, делаем редирект
          // this.isLog = true
          localStorage.hash = data.hash
          // this.$root.isAuth = true
          console.log('cppkie', localStorage)
          // this.checkAutorization;
          console.log(this.$route.params.nextUrl)
          // this.$router.replace('events')
          this.$emit('checkAuthAgain');
          }
      })
      }
  },
  mounted(){
      // this.getUsers()
      // this.$router.replace('events')
  }
}
</script>
