import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dashboardService:DashboardService ,private favouriteService:FavouriteService,private changeDetectorRef: ChangeDetectorRef,public router:Router) { }
  search:any= "";

  displayedColumns: string[] =[ 'name', 'like', 'artist' , 'listeners'];
  dataSource!: MatTableDataSource<any>;
  dashboard :any;
  showView:boolean = false;
  liked:boolean = false;
  image:any;
  array:any;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
  }

  onSearch(event:any){
    this.showView = false;
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
          params = params.append('artist', element.artist);
          params = params.append('track', element.name );
          params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
          params = params.append('format', "json"); 
          this.dashboardService.getTracks(params).subscribe( (x:any) => {
            console.log(x);
            this.image = x.track?.album?.image[2]['#text'];
            let email = localStorage.getItem('email');
            this.array =
            {
              "email": email,
              "tracks": [
                  {
                      "trackName": element.name,
                      "artist": element.artist,
                      "url": element.url,
                      "image":  this.image
                  }
              ]
          }
            console.log(this.array);
            this.favouriteService.saveFavourite(this.array).subscribe(x=> {
              
            })
          });
      }
    }
  }

  getTrack(){
    let params = new HttpParams(); 
    params = params.append('method',"track.search" );
    params = params.append('track', this.search);
    params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
    params = params.append('format', "json");

    this.dashboardService.getTracks(params).subscribe(data => {
      console.log(data);
      this.dashboard = data;
      this.showView = true;
      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.dashboard.results.trackmatches.track);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  searchList(){
    if(this.search !== ""){
      this.getTrack();
     }
  }

}
