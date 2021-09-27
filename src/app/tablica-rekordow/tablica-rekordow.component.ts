import { Component, OnInit } from '@angular/core';
import { Rekord } from "../models/rekordy";
import { TablicaLstorageService } from "../tablica-lstorage.service";
import { switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentPlayarService } from "../current-playar.service";
import { RekordyFirebaseService } from "../shared/rekordy-firebase.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-tablica-rekordow',
  templateUrl: './tablica-rekordow.component.html',
  styleUrls: ['./tablica-rekordow.component.scss']
})
export class TablicaRekordowComponent implements OnInit {

  tablicaTrybLatwy$: Observable<Rekord[]> | undefined;
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


  constructor(private tablicaLStorageServive: TablicaLstorageService,
              private currentPlayaService: CurrentPlayarService,
              private rekordyApi: RekordyFirebaseService,
              private actRoute: ActivatedRoute,
              private router: Router)
  {
    this.currentPlayaService.dataString$.subscribe(nazwa => this.gracz = nazwa);
    this.currentPlayaService.dataBoolean$.subscribe(tryb => this.trybHard = tryb);
  }

  ngOnInit(): void {
      this.tablicaTrybLatwy$ = this.refreshUsers$.pipe(switchMap(_ => this.tablicaLStorageServive.getEZRecords()));
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
        })
      })

      // const id = this.actRoute.snapshot.paramMap.get('id') as string;
      // this.rekordyApi.getEZRekord(id).valueChanges().subscribe(data =>{
      // oguem teraz moge wziac DANE z całego rekordu o danym id
      // })

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
    console.log("Wlaczony tryb hard: ", this.trybHard);
  }

  usunRekord(nr: number, isHard: boolean): void{

    let curentUserName = this.gracz;

    if (!isHard){
      this.usrIndex = this.tablicaLStorageServive.tablicaRekordow.findIndex((obj => obj.name == curentUserName));
    }else{
      this.usrIndex = this.tablicaLStorageServive.tablicaTrybHARD.findIndex((obj => obj.name == curentUserName));
    }

    if (this.usrIndex === nr)
    {
      return this.tablicaLStorageServive.sendData(this.tablicaLStorageServive.removeRecord(nr, isHard), this.trybHard);
    }
    else
    {
      this.prawidlowyGracz = false;
      this.statusUsuniecia = "Nie możesz usunąć cudzego rekordu  " + this.gracz;
    }
    setTimeout(() => {this.prawidlowyGracz = true}, 3700);
  }

}


