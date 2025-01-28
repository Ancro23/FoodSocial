import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = {headers: new HttpHeaders({'content-Type': 'application/json'})};
  constructor(
    private http:HttpClient
  ) { }

getUser(id:any){
  return new Promise((accept,reject) =>{
    this.http.get(`${this.urlServer}/users/$(id)`, this.httpHeaders).subscribe(
      (Data: any)=>{
          accept(Data);
      },
      (error) => {
        console.log(error,'error');
        if (error.status == 500){
          reject('error porfavor intentar mas tarde');
        }else{
          reject('error al obtener el usuario');
        }
      }
    )
});
}
}



