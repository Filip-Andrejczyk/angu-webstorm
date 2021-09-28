import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoZApiComponent} from "../info-z-api/info-z-api.component";
import {Observable} from "rxjs";
import {DogsRandomService} from "../dogs-random.service";
import {JedenWybranyPiesService} from "../jeden-wybrany-pies.service";
import {TablicaLstorageService} from "../tablica-lstorage.service";
import {CurrentPlayarService} from "../current-playar.service";
import {RekordyFirebaseService} from "../shared/rekordy-firebase.service";
import {Rekord} from "../models/rekordy";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  goodAnswerBreed$: Observable<string> | undefined;
  allObservable$: Observable<string[]> | undefined;
  losowe$: Observable<string[]> | undefined;
  czteryodp$: Observable<string[]> | undefined;

  public poprawny: string = "";

  public liczdobre: number = 0;
  public personalBest: number = 0;

  public dogForm: FormGroup = this.fb.group({});
  public stringStyle: string = "btn-default";
  public div: string = "";

  public dogSelected: boolean = false;
  public isuserName: boolean = false;
  public przegrana: boolean = false;
  public clicked: boolean = false;
  public isHard: boolean = false;

  public timeForAnswer: number = 8;
  public interval: number = 0;

  public currentPlayaID: string = "";
  public personalBestFirebase: number = 0;

  public rekordy: Rekord[];

  public inputPlaceholder: string = "";

  constructor(
              private infozapicomponent: InfoZApiComponent,
              private cdRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private dogsRandomService: DogsRandomService,
              private jedenWybranyPiesService: JedenWybranyPiesService,
              private tablicaLStorageService: TablicaLstorageService,
              private currentPlayaService: CurrentPlayarService,
              private rekordyAPI: RekordyFirebaseService,
              )
              {
                this.goodAnswerBreed$ = this.jedenWybranyPiesService.breed$;
                this.allObservable$ = this.dogsRandomService.wszystkieRasy$;
              }

  ngOnInit(): void {

    this.goodAnswerBreed$?.subscribe(ta => this.poprawny = ta);
    this.currentPlayaService.dataBoolean$.subscribe(hard => this.isHard = hard);

    this.losowe$ = this.dogsRandomService.trzylosowe$;
    this.czteryodp$ = this.dogsRandomService.odpowiedzi$;

    let recordsFromFirebase = this.rekordyAPI.getWynikiEz();
    recordsFromFirebase.snapshotChanges().subscribe(data => {
      this.rekordy = [];
      data.forEach(item => {
        let rekord: Rekord = item.payload.toJSON() as Rekord;
        if (typeof item.key === 'string'){
          rekord.$key = item.key;
        }
        this.rekordy?.push(rekord as Rekord);
      })
    })

  }

  formu = new FormGroup({
    gender: new FormControl('', Validators.required)
  });

  login = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  get f() {
    return this.formu.controls;
  }

  setDificultyLvl(lvl: boolean){
    this.currentPlayaService.dataBoolSource.next(lvl);
  }

  newUser(){
    this.przegrana = false;
    this.isuserName = false;
    this.login.value.username = "";
    this.infozapicomponent.nextPieselek();
  }

  tryAgain(){
    this.przegrana = false;
    this.infozapicomponent.nextPieselek();
    if (this.isHard){
      this.startTimer();
    }
  }

  koniecGry(){
    this.isuserName = false;
    this.przegrana = false;
    this.currentPlayaService.saveData("");
  }

  udzielonoDobrejOdpowiedzi(){
    this.liczdobre++;
    if (this.isHard){
      this.stopTimer();
    }
    setTimeout(() => {
      this.dogSelected = false;
      this.infozapicomponent.nextPieselek();
      this.clicked = false;
      this.startTimer();
    }, 2000);
  }

  udzielonoZlejOdpowiedzi(fast = false){

    this.liczdobre = 0;

    if (this.isHard) {this.stopTimer();}

    if (!fast) {
      setTimeout(
        () => {
          this.dogSelected = false;
          this.przegrana = true;
          this.clicked = false;
        }, 2000);
    }
    else {
      this.dogSelected = false;
      this.przegrana = true;
      this.clicked = false;
    }
  }

  startTimer(){
    if (this.isHard){
      this.timeForAnswer = 8;
      this.interval = setInterval(() => {

        if (this.timeForAnswer > 0) {
          this.timeForAnswer--;
        }
        else {
          this.stopTimer();
          this.udzielonoZlejOdpowiedzi(true);
        }
      }, 1000)
    }
  }

  stopTimer(){
    clearInterval(this.interval);
  }

  submit() {
    this.dogSelected = true;
    this.clicked = true;

    if (this.formu.value.gender == this.poprawny)
    {
      this.udzielonoDobrejOdpowiedzi();
    }
    else
    {
      this.udzielonoZlejOdpowiedzi();
    }

    if (!this.isHard)
    {
      if (this.liczdobre > this.personalBestFirebase)
      {
        this.tablicaLStorageService.sendData(this.tablicaLStorageService.updateRecord(this.login.value.username, this.liczdobre, this.isHard), this.isHard);
        this.rekordyAPI.updateRekord(this.login.value.username, this.liczdobre, this.currentPlayaID);
        this.personalBest = this.liczdobre;
      }
    }
    else
    {
      this.tablicaLStorageService.sendData(this.tablicaLStorageService.updateRecord(this.login.value.username, this.liczdobre, this.isHard), this.isHard);
    }
    this.formu.reset();
  }

  submit2() {

    if (this.login.value.username == "")
    {
      this.isuserName = false;
      this.inputPlaceholder = "      UZUPEŁNIJ POLE"
    }
    else
    {
      this.isuserName = true;
      this.liczdobre = 0;
      this.currentPlayaService.saveData(this.login.value.username);

      if(this.rekordy.find(x => x.name == this.login.value.username) !== undefined){
        console.log("istnieje");
      }else{
        this.rekordyAPI.addEZRekord(this.login.value.username, this.liczdobre);
      }

      // if (!this.tablicaLStorageService.findUser(this.login.value.username, this.isHard))
      // {
      //   this.tablicaLStorageService.sendData(this.tablicaLStorageService.addRecord(this.login.value.username, this.liczdobre, this.isHard), this.isHard);
      // }
      // else
      // {
      //   this.personalBest = this.tablicaLStorageService.PersonalBest(this.login.value.username, this.isHard);
      // }

      let recordsFromFirebase = this.rekordyAPI.getWynikiEz();
      recordsFromFirebase.snapshotChanges().subscribe(data => {
        this.rekordy = [];
        data.forEach(item => {
          let rekord: Rekord = item.payload.toJSON() as Rekord;
          if (typeof item.key === 'string'){
            rekord.$key = item.key;
          }
          this.rekordy?.push(rekord as Rekord);
        })
        let ind = this.rekordy.findIndex(x => x.name == this.login.value.username);
        this.currentPlayaID = this.rekordy[ind].$key;
        this.personalBestFirebase = this.rekordy[ind].score;
      })
    }
    if (this.isHard){
      this.startTimer();
    }

  }
}



