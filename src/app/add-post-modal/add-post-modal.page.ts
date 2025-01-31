import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource,Photo} from'@capacitor/camera';
import { defineCustomElements} from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
defineCustomElements(window);
@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone:false
})
export class AddPostModalPage implements OnInit {
  post_image:any;
  addPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage:Storage,
    private modalController:ModalController
  ) {
    this.addPostForm = this.formBuilder.group({
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }


 async uploadPhone(){
console.log('Upload Photo');
const uploadPhoto = await Camera.getPhoto({
  resultType: CameraResultType.DataUrl,
  source: CameraSource.Photos,
  quality: 100
});
this.post_image= uploadPhoto.dataUrl;

this.addPostForm.patchValue({
  image: this.post_image
});

  }
 async addPost(post_data: any){
    console.log('Add Post');
    console.log(post_data);
    const user =  await this.storage.get('user');
   const post_param = {
    post:{
      description: post_data.description,
      image: post_data.image,
      user_id: user.id
    }
      
    }
    console.log(post_param, 'post pata enviar');
    this.postService.createPost(post_param).then(
      (data:any) => {
         console.log(data,'post creado');
data.user = {
id: user.id,
name: user.name,
image: user.image || 'assets/image/defaul/avatar.png'
};
this.postService.postCreate.emit(data);
this.addPostForm.reset();
this.post_image = null;
this.modalController.dismiss();
      },
        (error) =>{
          console.log(error,'error');
        }
    );
  }
}
