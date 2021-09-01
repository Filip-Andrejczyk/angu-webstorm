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

  tablicaTrybLatwy$: Observable<Rekord[]> | undefined;
  tablicaTrybTrudny$: Observable<Rekord[]> | undefined;

  refreshUsers$ = new BehaviorSubject<boolean>(true);
  public kliknietoEdytuj: boolean = false;

  public statusUsuniecia: string = "";
  public prawidlowyGracz = true;

  public gracz: string = "";
  public trybHard: boolean = false;

  constructor(private tablicaLStorageServive: TablicaLstorageService,
              private currentPlayaService: CurrentPlayarService)
  {
    this.currentPlayaService.dataString$.subscribe(nazwa => this.gracz = nazwa);
    this.currentPlayaService.dataBoolean$.subscribe(tryb => this.trybHard = tryb);
  }

  ngOnInit(): void {
      this.tablicaTrybLatwy$ = this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getEZRecords()));
      this.tablicaTrybTrudny$ = this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getHardRecords()));
  }

  edytujClikc(): void{

    this.kliknietoEdytuj = !this.kliknietoEdytuj;

  }

  usunRekord(nr: number): void{

    let curentUserName = this.gracz;
    let usrIndex = this.tablicaLStorageServive.tablicaRekordow.findIndex((obj => obj.name == curentUserName));

    if (usrIndex === nr)
    {
      return this.tablicaLStorageServive.sendData(this.tablicaLStorageServive.removeRecord(nr), this.trybHard);
    }
    else
    {
      this.prawidlowyGracz = false;
      this.statusUsuniecia = "Nie możesz usunąć cudzego rekordu  " + this.gracz;
    }
    setTimeout(() => {this.prawidlowyGracz = true}, 3700);
  }

}


