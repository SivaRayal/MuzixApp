import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http :HttpClient) { }

  token:any = localStorage.getItem('token');

 topTrackApi:string =  "https://ws.audioscrobbler.com/2.0"


  getTracks(data:any){
    return this.http.get(this.topTrackApi,{params:data});
  }



}
