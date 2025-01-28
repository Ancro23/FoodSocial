import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, RequiredValidator} from '@angular/forms'
import { AuthService} from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {
 loginForm: FormGroup;
 errorMessage: any;
 formErrors = {
email: [

  { type: 'required', message: 'El correo es obligatorio'},
  { type: 'email', message: 'el correo no es valido'}
],
password: [
  { type: 'required', message: 'La contraseña es obligatoria.' },
  { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
],

 }
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private navCtrl: NavController,
    private Storage:Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email   
      ])),
      password: new FormControl('', Validators.compose( [     
        Validators.minLength(6),
        Validators.required

          ]))
    })


   }  

  ngOnInit() {
  }
  loginUser(credentials:any){
    this.authService.login(credentials).then((res: any) => {
      console.log(res);
      
      this.errorMessage= '';
      this.Storage.set('user', res.user);
      this.Storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
  }).catch(err => {
    console.log(err);
    this.errorMessage = err;
  });

}
goToRegister() {
  this.navCtrl.navigateForward('/register');
}
}


