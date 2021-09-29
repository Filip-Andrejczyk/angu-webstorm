import { Component, OnInit } from '@angular/core';
import { Rekord } from "../models/rekordy";
import { TablicaLstorageService } from "../tablica-lstorage.service";
import { switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentPlayarService } from "../current-playar.service";
import { RekordyFirebaseService } from "../shared/rekordy-firebase.service";

@Component({
  selector: 'app-tablica-rekordow',
  templateUrl: './tablica-rekordow.component.html',
  styleUrls: ['./tablica-rekordow.component.scss']
})
export class TablicaRekordowComponent implements OnInit {

  tablicaTrybTrudny$: Observable<Rekord[]> | undefined;

  refreshUsers$ = new BehaviorSubject<boolean>(true);

  rekordy: Rekord[]; //to jest lista wszystkk
  hideWhenNoRecords: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  public kliknietoEdytuj: boolean = false;
  public usrIndex: number = 0;
  public statusUsuniecia: string = "";
  public prawidlowyGracz = true;

  public gracz: string = "";
  public trybHard: boolean = false;

  public napisLatwy: string = "TRYB ŁATWY";
  public napisTrudny: string = "TRYB TRUDNY";

  public graRunning: boolean = true;


  constructor(private tablicaLStorageServive: TablicaLstorageService,
              private currentPlayaService: CurrentPlayarService,
              private rekordyApi: RekordyFirebaseService,
              )
  {
    this.currentPlayaService.dataString$.subscribe(nazwa => this.gracz = nazwa);
    this.currentPlayaService.dataBoolean$.subscribe(tryb => this.trybHard = tryb);
    this.currentPlayaService.gameStatus$.subscribe(status => this.graRunning = status);
  }

  ngOnInit(): void {
      //this.tablicaTrybLatwy$ = this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getEZRecords()));
      this.tablicaTrybTrudny$ = this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getHardRecords()));

      this.dataState();
      let rekordyAll = this.rekordyApi.getWynikiEz();
      rekordyAll.snapshotChanges().subscribe(data => {
        this.rekordy = [];
        data.forEach(item => {
          let rekord: Rekord = item.payload.toJSON() as Rekord;
          if (typeof item.key === 'string'){
            rekord.$key = item.key;
          }
          this.rekordy?.push(rekord as Rekord);
          this.rekordy.sort((a, b) => {return b.score - a.score});
        })
      })
  }


  dataState(){
    this.rekordyApi.getWynikiEz().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoRecords = false;
        this.noData = true;
      }else{
        this.hideWhenNoRecords = true;
        this.noData = false;
      }
    })
  }

  edytujClikc(): void{
    this.kliknietoEdytuj = !this.kliknietoEdytuj;
  }

  usunRekord(name: string, key: string, isHard: boolean, nr: number): void{

    let curentUserName = this.gracz;

      // this.usrIndex = this.tablicaLStorageServive.tablicaTrybHARD.findIndex((obj => obj.name == curentUserName));
      // this.tablicaLStorageServive.sendData(this.tablicaLStorageServive.removeRecord(nr, isHard), this.trybHard);

    if(!isHard){
      if (curentUserName === name)
      {
        this.rekordyApi.deleteRekordEz(key);
      }
      else{
        this.prawidlowyGracz = false;
        this.statusUsuniecia = "Nie możesz usunąć cudzego rekordu  " + this.gracz;
      }
    }
    else
    {
      if(curentUserName !== "admin69"){
        this.prawidlowyGracz = false;
        this.statusUsuniecia = "Nieeemaa usuwania rekordów w trybie hard " + this.gracz + " hamie";
      }else{
        this.tablicaLStorageServive.sendData(this.tablicaLStorageServive.removeRecord(nr, isHard), this.trybHard);
      }

    }
    setTimeout(() => {this.prawidlowyGracz = true}, 3700);
  }

}


