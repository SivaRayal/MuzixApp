import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    });
  }

  getFavourites() {
    const headers = this.getHeaders();
    return this.http.get("http://192.168.1.4:8800/wishlist/getFavorites", { headers });
  }

  removeFavorites(data: any) {
    const headers = this.getHeaders();
    return this.http.delete("http://192.168.1.4:8800/wishlist/removeFavorites", { body: data, headers });
  }

  saveFavourite(data: any) {
    const headers = this.getHeaders();
    return this.http.post("http://192.168.1.4:8800/wishlist/updateFavorites", data, { headers });
  }

}
