import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomePageRoutingModule } from '../home/home-routing.module';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({ 'content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient
  ) { }

  getPosts(page:number, perPage: number) {
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/posts?page=${page}&per_page=${perPage}`, this.httpHeaders).subscribe(
        (Data: any) => {


          accept(Data);


        },
        (error) => {
          console.log(error);
          if (error.status == 500) {
            reject('error porfavor intentar mas tarde');
          } else {
            reject('error al obtener los postos');
          }
        }
      )
    });
  }
    createPost(post_data: any){
      return new Promise((accept, reject) => {
        this.http.post(`${this.urlServer}/posts`,post_data, this.httpHeaders).subscribe(
          (Data: any) => {
            accept(Data);
          },
          (error) => {
            console.log(error, 'error');
            if (error.status == 500) {
              reject('error porfavor intentar mas tarde');
            } else {
              reject('error al obtener los postos');
            }
          }
        )
    });
}
}
