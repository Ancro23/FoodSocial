import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    last_name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };

  isEditing = false;
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public alertController: AlertController
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "usuario");

    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;

        // Rellenar el formulario con los datos del usuario
        this.profileForm.patchValue({
          name: data.name,
          last_name: data.last_name
        });
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  async updateProfile() {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.user_data,
        ...this.profileForm.value
      };

      this.userService.updateUser(updatedUser).then(() => {
        this.user_data = updatedUser;
        this.storage.set('user', updatedUser);
        this.isEditing = false;
        this.showToast('Perfil actualizado correctamente');
      }).catch(() => {
        this.showToast('Error al actualizar el perfil');
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.profileForm.patchValue({
      name: this.user_data.name,
      last_name: this.user_data.last_name
    });
  }

  async takePhoto(source: CameraSource) {
    console.log('take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });

    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.updateProfile();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  async presentPhotoOptions(){
    const alert = await this.alertController.create({
      header: "Seleccionar una opcion",
      message:"¿De donde Desea obtener la imagen",
      buttons:[
        {
          text:"camera",
          handler:() => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text:"Galeria",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text:"Cancelar",
          role:"cancel",
          handler:() => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }
  
}
