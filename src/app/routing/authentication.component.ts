import {Component} from '@angular/core';
import {HttpService} from '../common/http.service';
import {Md5} from 'ts-md5';
import {DialogComponent} from '../common/dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth-comp',
  template: `<div class="text-center">
    <div class="signin" style="margin-top: 10%">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="text" id="inputEmail" class="form-control" placeholder="Login" required="" autofocus="" [(ngModel)]="login">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" [(ngModel)]="password">
      <button class="btn btn-lg btn-primary btn-block" (click)="signIn()">Sign in</button>
      <p class="mt-5 mb-3 text-muted">© DREC 2018</p>
    </div>
  </div>`,
  styles: [`.signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .signin .form-control:focus {
    z-index: 2;
  }
  .signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }`]
})


export class AppAuthenticationComponent {

  login: string;
  password: string;

  constructor(private http: HttpService, public dialog: MatDialog, private router: Router) {}


  signIn() {
    if(this.login === undefined || this.password === undefined) {
      this.openDialog('Поля должны быть заполнены');
      return;
    }
    const user = {'login': this.login, 'password': Md5.hashStr(this.password)};
    this.http.postData('', user);
  }


  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: message
    });

  }

}

