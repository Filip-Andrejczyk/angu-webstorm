import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoZApiComponent} from "../info-z-api/info-z-api.component";
import {Observable} from "rxjs";
import {DogsRandomService} from "../dogs-random.service";
import {JedenWybranyPiesService} from "../jeden-wybrany-pies.service";
import {TablicaLstorageService} from "../tablica-lstorage.service";


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

  constructor(
              private infozapicomponent: InfoZApiComponent,
              private cdRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private dogsRandomService: DogsRandomService,
              private jedenWybranyPiesService: JedenWybranyPiesService,
              private tablicaLStorageService: TablicaLstorageService,
              )
  {
    this.goodAnswerBreed$ = this.jedenWybranyPiesService.breed$;
    this.allObservable$ = this.dogsRandomService.wszystkieRasy$;
  }

  ngOnInit(): void {
    this.goodAnswerBreed$?.subscribe(ta => this.poprawny = ta);
    this.losowe$ = this.dogsRandomService.trzylosowe$;
    this.czteryodp$ = this.dogsRandomService.odpowiedzi$;
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

  newUser(){
    this.przegrana = false;
    this.isuserName = false;
    this.infozapicomponent.nextPieselek();
  }

  tryAgain(){
    this.przegrana = false;
    this.infozapicomponent.nextPieselek();
  }

  koniecGry(){
    this.isuserName = false;
    this.przegrana = false;
  }

  submit() {
    this.dogSelected = true;

    if (this.formu.value.gender == this.poprawny)
    {
      this.liczdobre++;

      setTimeout(() => {
        this.dogSelected = false;
        this.infozapicomponent.nextPieselek();
      }, 2000);
    }
    else
    {
      this.liczdobre = 0;

      setTimeout(
        () => {
          this.dogSelected = false;
          this.przegrana = true;
        }, 1000);
    }

    if (this.liczdobre > this.personalBest)
    {
    this.tablicaLStorageService.sendData(this.tablicaLStorageService.updateRecord(this.login.value.username, this.liczdobre));
    }

    this.formu.reset();
  }

  submit2() {
    this.isuserName = true;
    this.liczdobre = 0;

    if (!this.tablicaLStorageService.findUser(this.login.value.username))
    {
      this.tablicaLStorageService.sendData(this.tablicaLStorageService.addRecord(this.login.value.username, this.liczdobre));
    }
    else
    {
      this.personalBest = this.tablicaLStorageService.PersonalBest(this.login.value.username);
    }
  }
}



