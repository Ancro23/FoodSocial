import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = {headers: new HttpHeaders({'content-Type': 'application/json'})};

    constructor(
      private http:HttpClient
    ) { }

  login(credentials: any){                                        
  return new Promise((accept, reject) => {
  let params = {
    "user":{
      "email":credentials.email,
      "password": credentials.password
  }
}
this.http.post(`${this.urlServer}/login`,params, this.httpHeaders).subscribe(
      (Data: any)=>{
        console.log(Data);
        if(Data.status == 'ok'){
          accept(Data);
        }else{
          reject(Data.errors)
        }
      },
      (error) => {
        console.log(error);
        if(error.status == 422){
          reject('Usuario o contraseña incorrecta');
        }else if (error.status == 500){
          reject('error porfavor intentar mas tarde');
        }else{
          reject('error al intentar iniciar sesion');
        }
      }
    )
  });
}
register(data:any){
  return new Promise((accept,reject) => {
  let params ={
    "user":{
      "email":data.email,
      "password": data.password,
      "password_confirmation": data.password_confirmation,
      "name":data.name,
      "last_name": data.last_name,
      "username": data.username
    }
  }
 this.http.post(`${this.urlServer}/sigup`,params, this.httpHeaders).subscribe(
      (Data: any)=>{
        console.log(Data);
        if(Data.status == 'ok'){
          accept(Data);
        }else{
          reject(Data.errors)
        }
      },
      (error) => {
        console.log(error);
        if(error.status == 422){
          reject(error.error.errors);
        }else if (error.status == 500){
          reject('error porfavor intentar mas tarde');
        }else{
          reject('error al intentar registrarse');
        }
      }
    )
  });
}
}
