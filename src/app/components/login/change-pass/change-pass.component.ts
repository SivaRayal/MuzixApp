import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(private loginService:LoginService,private snackBar:MatSnackBar) { }

  username:any = "";
  newPassword:any = "";
  oldPassword:any = "";
  isUsernameValid:boolean = true; 
  isOldPasswordValid:boolean = true;
  isNewPasswordValid : boolean = true;

  ngOnInit(): void {
  }

  submit(){
   var regex = /^[a-zA-Z0-9@-_.]{6,40}$/ ;
    if(!regex.test(this.username)){
      this.isUsernameValid = false;
    }else{
      this.isUsernameValid = true;
    }
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if(!passwordRegex.test(this.newPassword)){
      this.isNewPasswordValid = false;
    }else{
      this.isNewPasswordValid = true;
    }
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if(!passwordRegex.test(this.oldPassword)){
      this.isOldPasswordValid = false;
    }else{
      this.isOldPasswordValid = true;
    }
    const params = {
      "UserEmail": this.username,
      "OldPassword": this.oldPassword,
      "NewPassword":this.newPassword
    }
    if(this.isNewPasswordValid && this.isOldPasswordValid && this.isUsernameValid){
      this.loginService.ChangePwd(params).subscribe((x:any) =>{
        var text = x;  
        console.log(text);    
        if(x.StatusMessage){
        this.snackBar.open(x.StatusMessage, 'OK', {
          duration: 5000, 
          verticalPosition: 'top' as MatSnackBarVerticalPosition
        });
        this.username = "";
        this.newPassword = "";
        this.oldPassword = "";
      }
      },error => {
        this.snackBar.open(error.error.text, 'OK', {
          duration: 5000, 
          verticalPosition: 'top' as MatSnackBarVerticalPosition
        });
        this.username = "";
        this.newPassword = "";
        this.oldPassword = "";
      })    
  }
  
  }
}