import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService , private router:Router ,private snackBar:MatSnackBar) { }

  username:any = "";
  password:any = "";
  isUsernameValid:boolean = true; 
  isPasswordValid:boolean = true;

  ngOnInit(): void {
    localStorage.clear();
  }

  submit(){
   var regex = /^[a-zA-Z0-9@-_.]{6,40}$/ ;
    if(!regex.test(this.username)){
      this.isUsernameValid = false;
    }else{
      this.isUsernameValid = true;
    }
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if(!passwordRegex.test(this.password)){
      this.isPasswordValid = false;
    }else{
      this.isPasswordValid = true;
    }
    const params = {
      "UserEmail": this.username,
      "Password": this.password
    }
    if(this.isPasswordValid && this.isUsernameValid ){
      this.loginService.login(params).subscribe((x:any) =>{
        var token = x ;
        localStorage.setItem("token",token);
        localStorage.setItem("email",this.username);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        if (error.status === 409) {
          this.snackBar.open(error.error, 'OK', {
            duration: 5000, 
            verticalPosition: 'top' as MatSnackBarVerticalPosition
          });
        }
      })
    }
  }

}
