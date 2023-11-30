import { ViewportScroller } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService :DashboardService,private favouriteService:FavouriteService , public changeDetectorRef: ChangeDetectorRef,public scroller: ViewportScroller,private router:Router) { }
  
  displayedColumns: string[] =[ 'name', 'like', 'artist'];
  dataSource!: MatTableDataSource<any>;
  dashboard :any;
  showView:boolean = false;
  liked:boolean = false;
  genre:any;
  image:any;
  array:any;
  array1:any[]= [];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
  }

  likeClicked(element: any): void {
    element.liked = ! element.liked
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['login']);
    }
    else{
      if(element.liked == true){
          let params = new HttpParams(); 
          params = params.append('method',"track.getInfo" );
          params = params.append('artist', element.artist.name );
          params = params.append('track', element.name );
          params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
          params = params.append('format', "json"); 
          this.dashboardService.getTracks(params).subscribe( (x:any) => {
            this.image = x.track?.album?.image[2]['#text'];
            let email = localStorage.getItem('email');
            this.array =
            {
              "email": email,
              "tracks": [
                  {
                      "trackName": element.name,
                      "artist": element.artist.name,
                      "url": element.url,
                      "image":  this.image
                  }
              ]
          }
            this.favouriteService.saveFavourite(this.array).subscribe(x=> {
              
            })
          });
      }
    }
  }

  getGenreTrack(genre:any){
    this.genre = genre.toUpperCase();
    let params = new HttpParams(); 
    params = params.append('method',"tag.gettoptracks" );
    params = params.append('tag', genre);
    params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
    params = params.append('format', "json");

    this.dashboardService.getTracks(params).subscribe(data => {
      console.log(data);
      this.dashboard = data;
      this.showView = true;
      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.dashboard.tracks.track);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.scroller.scrollToAnchor('table');
    })
  }

  close(){
    this.showView = false;
  }

  

}
