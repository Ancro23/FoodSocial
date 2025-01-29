
import { CanActivate,} from '@angular/router';
import {  Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
@Injectable({

  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  constructor(private storage: Storage, private navCtrl: NavController){}
  async canActivate(){
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');
    if (isUserLoggedIn){
      console.log('puedo entrar');
      return true;
    }else{
      console.log('no puedo entrar');
      this.navCtrl.navigateRoot('/login');
      return false;
}
}
}
