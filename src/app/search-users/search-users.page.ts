import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false
})
export class SearchUsersPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasHoreUsers: boolean = true;
  current_user: any;
 


  constructor(
    private userService: UserService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.loadUsers();




  }
  async loadUsers(event?: any) {
    this.current_user = await this.storage.get('user');
    const followingUsers = this.current_user.followees || [];
    console.log('followingUsers', followingUsers);
    this.userService.listUsers(this.page, this.limit, this.query).then(
      (data: any) => {
        if (data.users.length > 0) {
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUsers.some((followedUser: any) => followedUser.id == user.id),
          }));
          this.users = [...this.users, ...updateUsers];
          console.log('users', this.users);
          this.page++;

        } else {
          this.hasHoreUsers = false;
        }
        if (event) {
          event.target.complete();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
        event.target.complete();
      }
    );

  }

  searhUsers(event?: any) {
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasHoreUsers = true;
    this.loadUsers();


  }
  follow(user_id: any) {
    console.log('follow', user_id);
    const followee_id = this.current_user.id;
    this.userService.followUser( user_id,followee_id).then(
      (data: any) => {
       console.log(data);
      this.users = this.users.map((user: any)=>{
        if( user.id == user_id){
          return {
            ...user,
            is_following: true
          }
        }
        return  user;
      });


      }

    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

  unfollow(user_id: any) {
    console.log('unfollow', user_id);
    const followee_id = this.current_user.id; 
  
    this.userService.unfollowUser(user_id, followee_id).then(
      (data: any) => {
        console.log(data);
  
    
        this.users = this.users.map((user: any) => {
          if (user.id === user_id) {
            return { ...user, is_following: false };
          }
          return user;
        });
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }


  togglefollow(user: any) {
    if (user.is_following) {
      this.unfollow(user.id);
    } else {
     this.follow(user.id);
      
    }
  }
}
