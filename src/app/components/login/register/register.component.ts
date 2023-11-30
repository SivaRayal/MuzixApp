import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private registerService:RegisterService ,private snackBar:MatSnackBar) { }

  firstname:any = "";
  lastname:any= "";
  password:any = "";
  email:any = "";
  contact:any= "";
  isUsernameValid:boolean = true;
  isFirstnameValid:boolean = true;
  isLastnameValid:boolean = true;
  isEmailValid:boolean = true;
  isContactValid:boolean = true;
  isPasswordValid:boolean = true;


  Validation(){
    var regex = /^[a-zA-Z0-9@-_.]{3,30}$/ ;
    if(!regex.test(this.firstname)){
      this.isFirstnameValid = false;
    }else{
      this.isFirstnameValid = true;
    }
    if(!regex.test(this.lastname)){
      this.isLastnameValid = false;
    }else{
      this.isLastnameValid = true;
    }
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if(!passwordRegex.test(this.password)){
      this.isPasswordValid = false;
    }else{
      this.isPasswordValid = true;
    }
    var EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    ;
    if(!EmailRegex.test(this.email)){
      this.isEmailValid = false;
    }else{
      this.isEmailValid = true;
    }
    var ContactRegex = /^\d{10}$/;
    if(!ContactRegex.test(this.contact)){
      this.isContactValid = false;
    }else{
      this.isContactValid = true;
    }
  }

  register(){
    this.Validation();
    const params = {
    "UserEmail":this.email,
    "Password":this.password,
    "FirstName":this.firstname,
    "LastName":this.lastname,
    "ContactNumber":this.contact
    };
    if(this.isEmailValid && this.isContactValid && this.isPasswordValid && this.isFirstnameValid && this.isLastnameValid ){
      this.registerService.register(params).subscribe((x:any) =>{
        if(x.StatusMessage){
          this.snackBar.open(x.StatusMessage, 'OK', {
            duration: 5000, 
            verticalPosition: 'top' as MatSnackBarVerticalPosition
          });  
        }
      },error =>{
        if(error.status == 201){
          this.snackBar.open("Profile Saved Successfully", 'OK', {
            duration: 5000, 
            verticalPosition: 'top' as MatSnackBarVerticalPosition
          });  
        }
      })
    }


  }


}


