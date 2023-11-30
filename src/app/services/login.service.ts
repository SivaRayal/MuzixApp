import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  login(data:any){
    return this.http.post("http://192.168.1.4:8800/auth/validate",data,{headers:this.headers,responseType:'text'})
  }

  ChangePwd(data:any){
    return this.http.put("http://192.168.1.4:8800/userProfile/changePassword",data,{headers:this.headers})
  }

  ForgotPwd(data:any){
    return this.http.put("http://192.168.1.4:8800/userProfile/forgetPassword",data,{headers:this.headers})
  }


}
