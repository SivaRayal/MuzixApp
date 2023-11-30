import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private dashboardService:DashboardService ,private FavouriteService:FavouriteService) { }
  images:any;
  displayedColumns: string[] =['name', 'listeners'];
  dashboard:any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(){
   this.getTracks();
  this.getGenreTrack();
  }

  getTracks(){
    this.FavouriteService.getFavourites().subscribe((x:any)=>{
      this.images = x.tracks ;
    })
  }

  getGenreTrack(){
    let params = new HttpParams(); 
    params = params.append('method',"geo.getTopTracks" );
    params = params.append('country', "india");
    params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
    params = params.append('format', "json");

    this.dashboardService.getTracks(params).subscribe(data => {
      console.log(data);
      this.dashboard = data;
     this.dataSource = new MatTableDataSource(this.dashboard.tracks.track);
      this.dataSource.paginator = this.paginator;
    })
  }

  remove(x:any){
    let email = localStorage.getItem('email');
    const array = {
        "email": email ,
        "tracks": [x]
    }
    this.FavouriteService.removeFavorites(array).subscribe( (x:any) =>{
      this.getTracks();
    },error =>{
      this.getTracks();
    }
    );
    
  }

}
