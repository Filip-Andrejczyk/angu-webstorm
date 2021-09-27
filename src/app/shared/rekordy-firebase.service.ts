import { Injectable } from '@angular/core';
import { Rekord } from "../models/rekordy";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {Pismo} from "./pismo";

@Injectable({
  providedIn: 'root'
})
export class RekordyFirebaseService {

  rekordyEZRef: AngularFireList<any> | undefined;
  rekordyHARDRef: AngularFireList<any> | undefined;

  pojrekordRef: AngularFireObject<any> | undefined;

  constructor(private db: AngularFireDatabase) {}

  addEZRekord(name: string, score: number){
    this.rekordyEZRef?.push({
      name: name,
      score: score
    })
  }

  addHARDRekord(name: string, score: number){
    this.rekordyHARDRef?.push({
      name: name,
      score: score
    })
  }

  updateRekord(imie: string, wynik: number) {
    this.pojrekordRef?.update({
      name: imie,
      score: wynik
    })
  }

  getEZRekord(id: string){
    this.pojrekordRef = this.db.object('wyniki-ez/' + id);
    return this.pojrekordRef;
  }

  getHARDRekord(id: string){
    this.pojrekordRef = this.db.object('wyniki-hard/' + id);
    return this.pojrekordRef;
  }

  getWynikiEz(){
    this.rekordyEZRef = this.db.list('wyniki-ez');
    return this.rekordyEZRef;
  }

  // findUser(name: string): boolean{
  //
  // }

  getWynikiHard(){
    this.rekordyHARDRef = this.db.list('wyniki-hard');
    return this.rekordyHARDRef;
  }

  deleteRekordEz(id: string, tryb: string){
    this.pojrekordRef = this.db.object(tryb + '/' + id);
    this.pojrekordRef?.remove();
  }

}
