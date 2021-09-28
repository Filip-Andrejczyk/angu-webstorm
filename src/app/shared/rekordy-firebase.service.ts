import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {ScoreTab} from "../models/scoreTab";

@Injectable({
  providedIn: 'root'
})
export class RekordyFirebaseService {

  rekordyEZRef: AngularFireList<any> | undefined;
  tab: ScoreTab[];

  pojrekordRef: AngularFireObject<any> | undefined;

  constructor(private db: AngularFireDatabase) {}

  addEZRekord(name: string, score: number){
    this.rekordyEZRef?.push({
      name: name,
      score: score
    })
  }

  updateRekord(imie: string, wynik: number, id: string) {
    this.getEZRekord(id).update(
    {
      name: imie,
      score: wynik
    })
  }

  getEZRekord(id: string){
    this.pojrekordRef = this.db.object('wyniki-ez/' + id);
    return this.pojrekordRef;
  }


  getWynikiEz(){
    this.rekordyEZRef = this.db.list('wyniki-ez');
    return this.rekordyEZRef;
  }


  deleteRekordEz(id: string){
    this.pojrekordRef = this.db.object('wyniki-ez/' + id);
    this.pojrekordRef?.remove();
  }

}
