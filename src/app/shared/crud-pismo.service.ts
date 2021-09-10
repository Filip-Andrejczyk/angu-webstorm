import { Injectable } from '@angular/core';
import { Pismo } from "./pismo";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/compat/database";


@Injectable({
  providedIn: 'root'
})
export class CrudPismoService {

  pismaRef: AngularFireList<any> | undefined;
  pismoRef: AngularFireObject<any> | undefined;

  constructor(private  db: AngularFireDatabase) {}

  addPismo(pismo: Pismo){
    this.pismaRef?.push(
      {
        imie: pismo.imie,
        nazwisko: pismo.nazwisko,
        rodzajpisma: pismo.rodzajpisma,
        adresat: pismo.adresat,
        temat: pismo.temat,
        opis: pismo.opis,
        expanded: false
      })
  }

  updateExpand(pismo: Pismo, value: boolean) {
    this.pismoRef?.update({
      imie: pismo.imie,
      nazwisko: pismo.nazwisko,
      rodzajpisma: pismo.rodzajpisma,
      adresat: pismo.adresat,
      temat: pismo.temat,
      opis: pismo.opis,
      expanded: value
    })
  }



  getPismo(id: string){
    this.pismoRef = this.db.object('pisma-list/' + id);
    return this.pismoRef;
  }

  getPismaList() {
    this.pismaRef = this.db.list('pisma-list');
    return this.pismaRef;
  }

  updatePismo(pismo: Pismo) {
    this.pismoRef?.update({
      imie: pismo.imie,
      nazwisko: pismo.nazwisko,
      rodzajpisma: pismo.rodzajpisma,
      adresat: pismo.adresat,
      temat: pismo.temat,
      opis: pismo.opis
    })
  }

  deletePismo(id: string) {
    this.pismoRef = this.db.object('pisma-list/'+id);
    this.pismoRef?.remove();
  }

}
