import { HttpBackend, HttpClient, HttpContext, HttpEvent, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private loginService:LoginService,private snackBar:MatSnackBar) { }

  username:any = "";
  password:any = "";
  isUsernameValid:boolean = true; 
  isPasswordValid:boolean = true;

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
    if(!passwordRegex.test(this.password)){
      this.isPasswordValid = false;
    }else{
      this.isPasswordValid = true;
    }
    const params = {
      "UserEmail": this.username,
      "NewPassword": this.password
    }
    if(this.isPasswordValid && this.isUsernameValid){
      this.loginService.ForgotPwd(params).subscribe((x:any) =>{
       if(x?.StatusMessage){
        this.snackBar.open(x.StatusMessage, 'OK', {
          duration: 5000, 
          verticalPosition: 'top' as MatSnackBarVerticalPosition
        });
      }else{
        this.snackBar.open("Password reset Successfull", 'OK', {
          duration: 5000, 
          verticalPosition: 'top' as MatSnackBarVerticalPosition
        });
      }
      this.username = "";
      this.password = "";
    })
  }
  }
}
