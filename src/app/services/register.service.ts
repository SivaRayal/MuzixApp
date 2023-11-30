import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  token:any = localStorage.getItem('token');
 email:any = localStorage.getItem('email');

 private getHeaders() {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  });
}

  register(data:any){
    const headers = this.getHeaders();
    return this.http.post("http://192.168.1.4:8800/userProfile/register",data,{headers})
  }

  getUser(){
    const headers = this.getHeaders();
    let params = new HttpParams();
    params.append('email', this.email);
    return this.http.get("http://192.168.1.4:8800/userProfile/getUserProfile",{headers,params:params})
  }

  Update(data:any){
    const headers = this.getHeaders();
    return this.http.post("http://192.168.1.4:8800/userProfile/updateUserProfile",data,{headers})
  }

}
