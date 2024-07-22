import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogapiService {


  private urlApi: string = 'https://dog.ceo/api/breeds/image/random/';
  constructor(private http: HttpClient) { }


  obtenerCard(cantidad: string):Observable<any>{
    return this.http.get<any>(this.urlApi+cantidad);
  }
  
}