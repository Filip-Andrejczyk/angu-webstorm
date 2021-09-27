import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DogImage} from "./models/dog-image";
import {ApiResponse} from "./models/response";
import {DogRasa} from "./models/rasy";

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  private urlpisekowy = 'https://dog.ceo/api/breeds/image/random';
  private listaRas = 'https://dog.ceo/api/breeds/list/all';

  constructor( private http:HttpClient ) { }

  getRandomDoggo(){
    return this.http.get<DogImage>(this.urlpisekowy);
  }

  allBreeds():Observable<DogRasa>{
    return this.http.get<DogRasa>(this.listaRas)
  }

}
