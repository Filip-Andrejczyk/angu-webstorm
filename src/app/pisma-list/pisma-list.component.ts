import { Component, OnInit } from '@angular/core';
import { CrudPismoService } from "../shared/crud-pismo.service";
import { Pismo } from "../shared/pismo";

@Component({
  selector: 'app-pisma-list',
  templateUrl: './pisma-list.component.html',
  styleUrls: ['./pisma-list.component.scss']
})
export class PismaListComponent implements OnInit {

  p: number = 1;
  Pismo: Pismo[];
  hideWhenNoPismo: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  rozwinietyRow: boolean = false;


  szczegoly: string = "Szczegóły"
  ukryj: string = "ukryj"

  przycisknapis: string = this.szczegoly

  constructor(public crudApi: CrudPismoService) {}

  ngOnInit(): void {

    this.dataState();
    let s = this.crudApi.getPismaList();
    s.snapshotChanges().subscribe(data => {
      this.Pismo = [];
      data.forEach(item => {
        let a: Pismo = item.payload.toJSON() as Pismo;

        if (typeof item.key === 'string'){
          a.$key = item.key;
        }

        this.Pismo?.push(a as Pismo);
      })
    })

  }

  dataState() {
    this.crudApi.getPismaList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoPismo = false;
        this.noData = true;
      } else {
        this.hideWhenNoPismo = true;
        this.noData = false;
      }
    })
  }

  rozwinRow(pismo: Pismo){
    this.rozwinietyRow = !this.rozwinietyRow;
    if (!this.rozwinietyRow){
      this.przycisknapis = this.szczegoly
    }else {
      this.przycisknapis = this.ukryj
    }
  }

  deletePismo(pismo: Pismo) {
    if (window.confirm('Czy na pewno chcesz usunąc to PISMO?')) {
      this.crudApi.deletePismo(pismo.$key)
      //console.log(pismo.$key)
    }
  }

}
