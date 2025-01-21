import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, RequiredValidator} from '@angular/forms'

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
    private formBuilder: FormBuilder
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
    console.log(credentials,"credenciales de login")
  }

}
