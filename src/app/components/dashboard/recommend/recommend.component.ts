import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  constructor(private dashboardService:DashboardService,private router:Router,private favouriteService:FavouriteService) { }
  images:any;
  displayedColumns: string[] =['name', 'listeners'];
  dashboard:any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  arrayImage:any;
  arrayData :any[] = [];
  liked:boolean = false;
  array:any;

  ngOnInit(){
  this.getGenreTrack();
  this.getTracks();
  }

  getTracks(){
    let params = new HttpParams();
    params = params.append('method',"tag.getTopTracks" );
    var tags = ['rock', 'pop', 'jazz', 'Hip-Hop', 'hip hop','chillout','soul','rap','indie'];
    var randTag = Math.floor(Math.random() * tags.length);
    var recomander = tags[randTag];
    params = params.append('tag', recomander);
    params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
    params = params.append('format', "json");

    this.dashboardService.getTracks(params).subscribe((data:any) => {
     this.images = data.tracks.track;

     for(let i=0;i<=40 ; i++){
      let image;
     let name =  this.images[i].name;
     let artist = this.images[i].artist.name;
     let url = this.images[i].url;
     let params = new HttpParams();
     params = params.append('method',"track.getInfo" );
     params = params.append('artist', artist);
     params = params.append('track',  name );
     params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
     params = params.append('format', "json");
     this.dashboardService.getTracks(params).subscribe( (x:any) => {
      image = x.track?.album?.image[3]['#text'];
      let arrayData = {
        "name": name,
        "artist": artist,
        "url": url,
        "imageUrl": image
        }
          this.arrayData.push(arrayData);
     });

     }
    });
    console.log(this.arrayData);
  }

  getGenreTrack(){
    let params = new HttpParams();
    params = params.append('method',"geo.getTopTracks" );
    params = params.append('country', "india");
    params = params.append('api_key', "4cefff0e8ec8aafbdaf7916af675e294");
    params = params.append('format', "json");

    this.dashboardService.getTracks(params).subscribe(data => {
      this.dashboard = data;
     this.dataSource = new MatTableDataSource(this.dashboard.tracks.track);
     this.images = this.dashboard.tracks.track;
      this.dataSource.paginator = this.paginator;
    })
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
            let email = localStorage.getItem('email');
            this.array =
            {
              "email": email,
              "tracks": [
                  {
                      "trackName": element.name,
                      "artist": element.artist,
                      "url": element.url,
                      "image":  element.imageUrl
                  }
              ]
          }
            console.log(this.array);
            this.favouriteService.saveFavourite(this.array).subscribe(x=> {

            })
      }
    }
  }

}
