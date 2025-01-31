import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({ 'content-Type': 'application/json' }) };
  constructor(
    private http: HttpClient
  ) { }

  getUser(id: any) {
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/current_user/${id}`, this.httpHeaders).subscribe(
        (Data: any) => {
          accept(Data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500) {
            reject('error porfavor intentar mas tarde');
          } else {
            reject('error al obtener el usuario');
          }
        }
      )
    });
  }
  updateUser(user: any) {
    const user_params = { user: user }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/update/${user.id}`, user_params, this.httpHeaders).subscribe(
        (Data: any) => {
          accept(Data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500) {
            reject('error porfavor intentar mas tarde');
          } else {
            reject('error al actualizar el usuario');
          }
        }
      )
    });

  }
  listUsers(page: number, perPage: number, query: string = '') {
    const url = `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`;
    return this.http.get(url).toPromise();
  }




  followUser(user_id: any, followee_id: any) {
    const follow_params = {
      followee_id: followee_id
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/follow/${user_id}`, follow_params, this.httpHeaders).subscribe(
        (Data: any) => {
          accept(Data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500) {
            reject('error porfavor intentar mas tarde');
          } else {
            reject('error al seguir el usuario');
          }
        }
      )
    });

  }
  unfollowUser(user_id: any, followee_id: any) {
    const follow_params= {
      followee_id: followee_id
    };
  
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/unfollow/${user_id}`, follow_params, this.httpHeaders).subscribe(
        (Data: any) => {
          accept(Data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500) {
            reject('error por favor intentar más tarde');
          } else {
            reject('error al dejar de seguir al usuario');
          }
        }
      );
    });
  }
        }
  
