

const requests = {
  hello(){
    alert('hello!!!')
  },
  loadItems(from){
    console.log(' получится?', from)
    // в folder - название папки
      if (from == 'Все вещи'){
        console.log('xeee')
        // если folder == 'All', то api/get-item-all
        // иначе /api/get-items-by-folder можно и пост запросом
          return new Promise(function(resolve, reject){
            fetch('/api/get-item-all',{
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
              }).then(res=>{
                var s=res
                return s.json()
              }).then(data=>{
                console.log(data)
                resolve(data)
                console.log('What for?', reject)
              })
          })
      }
      else if(from == 'Корзина'){
        return new Promise(function(resolve, reject){
          fetch('/api/get-items-in-trash',{
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
            }).then(res=>{
              var s=res
              return s.json()
            }).then(data=>{
              console.log(data)
              resolve(data)
              console.log('What for?', reject)
            })
        })
      }
      else if(from == 'Given'){
        
        return new Promise(function(resolve, reject){
          fetch('/api/get-items-given',{
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
            }).then(res=>{
              var s=res
              return s.json()
            }).then(data=>{
              console.log(data)
              resolve(data)
            }).catch(err=>{
              console.log('What for?', reject)
              reject(err)
            })
        })
      }
      else{
        var url = ''
        var data = {
          name: ''
        }
        if(/^[-]/.test(from)){
          console.log('Came from storage')
          //начинается с "-" значит хранилище
          url = '/api/get-items-in-storage'

          data.name = from.slice(1) //только избавиться еще от "-"
          console.log(data.name)
        }
        else{
          console.log('Came from folder', from)
          //значит папка
          url = '/api/get-items-in-folder'
          data.name = from
          console.log(data.name)
        }
        return new Promise(function(resolve, reject){
          var fetchedData = {}
          console.log(data)
          fetch(url,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>{
            var s= res
            console.log(s)
            return s.json()
          }).then(data=>{
            console.log(data)
            // this.items = data
            fetchedData = data
            resolve(fetchedData)
            console.log(reject)
          })
        })
      }
  },
  updateItemInformation(item, givingId){
    console.log('Будет update вещи: ', item)
    var dataToSend ={
      item: item,
      givingId: givingId.givingCreatedId,
    }
    console.log(dataToSend)
    return new Promise(function(resolve, reject){
      fetch('/api/update-item', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(res=>{
            console.log('sent')
            return res.json();
          }).then(data=>{
            console.log('data', data);
            resolve(data)
          }).catch(err=>{
            reject(err)
          })
    })
  },
  deleteItem(withId, from){
    var itemId = {
      id: withId, 
      redirectTo: from
    };
    console.log(itemId.redirectTo)
    return new Promise(function(resolve, reject){
      fetch('/api/delete-item', {
        method: 'DELETE', 
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(itemId)
      }).then(()=>{
        
        resolve('Deleted')
        console.log(reject)
        // this.loadItems(this.routeFolderName)
      })
    })
    
  },
  install: function(Vue){
    Object.defineProperty(Vue.prototype, 'requests', {
      get () { return requests }
    })
  }
}


export default requests