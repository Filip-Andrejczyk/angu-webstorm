import { Component, OnInit } from '@angular/core';
import { Rekord } from "../models/rekordy";
import { TablicaLstorageService } from "../tablica-lstorage.service";
import { switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentPlayarService } from "../current-playar.service";


@Component({
  selector: 'app-tablica-rekordow',
  templateUrl: './tablica-rekordow.component.html',
  styleUrls: ['./tablica-rekordow.component.scss']
})
export class TablicaRekordowComponent implements OnInit {

  myData$: Observable<Rekord[]> | undefined
  refreshUsers$ = new BehaviorSubject<boolean>(true);
  public kliknietoEdytuj: boolean = false;
  public gracz: string = "";

  constructor(private tablicaLStorageServive: TablicaLstorageService,
              private currentPlayaService: CurrentPlayarService)
  {
    this.currentPlayaService.dataString$.subscribe(nazwa => this.gracz = nazwa);
  }

  ngOnInit(): void {
      this.myData$ = this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getRecords()));
  }

  edytujClikc(): void{

    this.kliknietoEdytuj = !this.kliknietoEdytuj;
    console.log("gracz z serwisa: ", this.gracz);
  }

  usunRekord(nr: number): void{
    return this.tablicaLStorageServive.sendData(this.tablicaLStorageServive.removeRecord(nr));
  }

}


