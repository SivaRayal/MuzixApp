import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  showView:boolean = false;
  showLogout:boolean = false;

  ngOnInit(){
    let token = localStorage.getItem('token');
    if(token){
      this.showView = false;
      this.showLogout = true;
    }else{
      this.showView = true;
      this.showLogout = false;
    }
  }

  login(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
