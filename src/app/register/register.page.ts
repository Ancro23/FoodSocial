import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, RequiredValidator} from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {
registerForm: FormGroup;
errorMessage:any;
formErrors = {
  email: [
  
    { type: 'required', message: 'El correo es obligatorio'},
    { type: 'email', message: 'el correo no es valido'}
  ],
  password: [
    { type: 'required', message: 'La contraseña es obligatoria.' },
    { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
  ],
  name: [
    { type: 'required', message: 'El nombre es obligatorio' },
  ],
  lastname: [
    { type: 'required', message: 'El apellido es obligatorio' },
  ],
  username: [
    { type: 'required', message: 'El nombre de usuario es obligatorio' },
  ],

  passwordConfirmation: [
    { type: 'required', message: 'La confirmación de contraseña es obligatoria' },
    { type: 'mustMatch', message: 'Las contraseñas no coinciden' },
  ]
};

  constructor( 
private formBuielder: FormBuilder

){
  this.registerForm = this.formBuielder.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email   
    ])),
    password: new FormControl('', Validators.compose( [     
      Validators.minLength(6),
      Validators.required
    ])),
  name: new FormControl('', Validators.required),
  lastname: new FormControl('', Validators.required),
  username: new FormControl('', Validators.required),
  
  passwordConfirmation: new FormControl('', Validators.required),
},
{ validators: this.mustMatch('password', 'passwordConfirmation') }
);

}

  ngOnInit() {
  }
  registerUser(registerData: any) {
    console.log( registerData,"Registro exitoso:");
    
  }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

