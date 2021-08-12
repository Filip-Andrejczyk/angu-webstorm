import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DogImage} from "./models/dog-image";

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  private urlpisekowy = 'https://dog.ceo/api/breeds/image/random';
  //private listaRas = 'https://dog.ceo/api/breeds/list/all';

  constructor( private http:HttpClient ) { }

  apiCall(){
    return this.http.get<DogImage>(this.urlpisekowy);
  }

}
