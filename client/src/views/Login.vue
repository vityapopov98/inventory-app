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
        //отправляем на сервер логи пароль
        //Получаем токен, если все норм
       var data = {
          email: this.login,
          password: this.password
        }
        console.log(data)
      // отправить на сервер
      fetch('/api/login',{
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
        if(data.accessToken == 'No user found'){
          console.log(data.accessToken)
          this.displayError = true
          this.loginErrorMessage = 'No user found'
        }
        else if(data.accessToken == ''){
          this.displayError = true
          this.loginErrorMessage = 'Incorrect'
        }
        else{
          //Все хорошо, делаем редирект
          localStorage.accessToken = data.accessToken;
          localStorage.refreshToken = data.refreshToken;
          console.log('cppkie', localStorage)
          // console.log(this.$route.params.nextUrl)
          this.$router.replace('/')
          // this.$emit('checkAuthAgain');
          }
      })
      }
  },
  mounted(){
    this.$root.accessToken = localStorage.accessToken
    console.log('token', this.$root.accessToken)
      // Проверить есть ли токен, потому что если есть вход не нужен, делаем редирект на Home
    if (this.$root.accessToken != '' && this.$root.accessToken != undefined) {
      console.log('rederection to home');
      this.$router.replace('/')
    }
      
  }
}
</script>
