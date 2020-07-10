<template>
  <div>
    <div >
      <!-- <p>Upload an image to Firebase:</p> -->
      <div class="upload-button">
        <label for="file">
          <svg class="feather">
            <use xlink:href="@/assets/feather-sprite.svg#paperclip"/>
          </svg>
          <span>Выбрать фото</span>
        </label>
        <input type="file" name="file" id="file" class="circleButton" @change="previewImage" accept="image/*" >
      </div>
    </div>
    <div>
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
    <!-- <div v-if="imageData!=null">
        <img class="preview" :src="picture">
        <br>
      <button class="circleButton" @click="onUpload($event)">Upload</button>
    </div> -->
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Upload',
  data(){
	return{
      imageData: null,
      picture: null,
      uploadValue: 0,
      lastUploadedImage: null
	}
  },
  methods:{
    previewImage(event) {
      this.uploadValue=0;
      console.log('from preview', this.picture)
      this.imageData = event.target.files[0];

      
        if(this.picture != null){
          console.log('it is second time')
          //удаляем предыдущее фото
          console.log('current upload', this.imageData.name)
          console.log('last upload', this.lastUploadedImage)
          const imageRef=firebase.storage().ref().child(this.lastUploadedImage)
          imageRef.delete().then(()=> {
            // File deleted successfully
            console.log('deleted')
            this.lastUploadedImage = this.imageData.name
            console.log('last upload become', this.lastUploadedImage)
            this.onUpload()
          }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log('Uh-oh, an error occurred!'+error)
            console.log(error)
          });
        }
        else{
          this.picture=null;
          this.lastUploadedImage = this.imageData.name
          this.onUpload()
        }
      
    },
    onUpload(event){
      if (event) {
        event.preventDefault()
      }
      console.log('from upload', this.picture)
      this.picture=null;
      const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);

      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.picture = url;
          this.$root.pictureUrl = url;
        });
      }
      );
    }

  },
  mounted(){
    console.log('view loaded', this.picture)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
img.preview {
    width: 200px;
}
input#file{
  opacity: 0;
  height: 0;
  /* width: 100% !important; */
}
.upload-button>label{
  /* background: #aeaeae; */
  padding: .5rem;
  cursor: pointer;
}
.upload-button>label:hover{
  color: #676767;
}
.upload-button span{
  padding: 0 .5rem;
}

</style>