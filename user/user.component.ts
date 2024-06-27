import { Component, OnInit } from '@angular/core';
import { User, UserInfo } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  useri: UserInfo;
  updateClicked:boolean=false;
  newUser: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };

  constructor(private userserve: UserService) {
    this.useri = {} as UserInfo;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userserve.getUsers().subscribe((data1: UserInfo) => {
      this.useri.page = data1.page;
      this.useri.per_page = data1.per_page;
      this.useri.total = data1.total;
      this.useri.total_pages = data1.total_pages;
      this.useri.data = data1.data.map((item) => {
        const user: User = {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          avatar: item.avatar,
        };
        return user;
      });
    });
  }

  postUsers(): void {
    this.userserve.postUsers(this.newUser).subscribe(
      (response: any) => {
        console.log('User added successfully:', response);
        const newUser: User = {
          id: response.id,
          first_name: this.newUser.first_name,
          last_name: this.newUser.last_name,
          email: this.newUser.email,
          avatar: this.newUser.avatar,
        };
        if (!this.updateClicked){
        this.useri.data.push(newUser);
        }
        console.log(this.useri.data);
        //this.getUsers();
        this.newUser = {
          id: 0,
          first_name: '',
          last_name: '',
          email: '',
          avatar: '',
         };
        this.updateClicked=false;
      },
      (error: any) => {
        console.error('Error adding user:', error);
      }
    );
  }
  updateUser(userId: number): void {
    const userToUpdate = this.useri.data.find((user) => user.id === userId);
    if (userToUpdate) {
      this.newUser = { ...userToUpdate };
      this.updateClicked=true;
      this.userserve.putUsers(userId, this.newUser).subscribe(
        (response: any) => {
          console.log('User updated successfully:', response);
          const index = this.useri.data.findIndex((user) => user.id === userId);
          console.log(index)
          if (index !== -1) {
            this.useri.data[index] = this.newUser;
          }
        },
        (error: any) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('User not found for update');
    }
  }
}
