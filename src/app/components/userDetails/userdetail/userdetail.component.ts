import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  isDisabled :boolean = true;

constructor(private registerService:RegisterService,private snackBar:MatSnackBar) { }

  username:any = "";
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
  data:any;



  ngOnInit() {
    this.getDetail();
  }

  Validation(){
    var regex = /^[a-zA-Z0-9@-_.]{3,30}$/ ;
    if(!regex.test(this.username)){
      this.isUsernameValid = false;
    }else{
      this.isUsernameValid = true;
    }
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
      "FirstName": this.firstname,
      "LastName": this.lastname,
      "UserEmail": this.email,
      "ContactNumber": this.contact
    }
    if(this.isEmailValid && this.isContactValid && this.isFirstnameValid && this.isLastnameValid){
      this.registerService.Update(params).subscribe((x:any)=>{
        this.snackBar.open(x, 'OK', {
          duration: 5000, 
          verticalPosition: 'top' as MatSnackBarVerticalPosition,
          panelClass: ['custom-snackbar'] 
        });
      },error =>{
        this.snackBar.open(error.error.text, 'OK', {
          duration: 5000, 
          verticalPosition: 'top' as MatSnackBarVerticalPosition
        });
      });
      this.isDisabled = true;
  }
  }

  getDetail(){
    this.registerService.getUser().subscribe((x:any)=>{
      this.data = x;
      this.email = x.UserEmail;
      this.firstname = x.FirstName;
      this.lastname = x.LastName;
      this.contact = x.ContactNumber;
      console.log(x);
    })
  }

  edit(){
    this.isDisabled = false;
  }


}
