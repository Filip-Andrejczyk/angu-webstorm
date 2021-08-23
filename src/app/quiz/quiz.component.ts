import {ChangeDetectorRef, Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoZApiComponent} from "../info-z-api/info-z-api.component";
import {Observable} from "rxjs";
import {DogsRandomService} from "../dogs-random.service";
import {JedenWybranyPiesService} from "../jeden-wybrany-pies.service";
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
  public objIndex: number = 0;
  public localStore = JSON.parse(<string>localStorage.getItem('wynik')) as Rekord[];

  public yourScore = this.localStore;
  // public yourScore:
  //   {
  //   name: string,
  //   score: number
  //   }[] = [];

  constructor(private infozapicomponent: InfoZApiComponent,
              private cdRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private dogsRandomService: DogsRandomService,
              private jedenWybranyPiesService: JedenWybranyPiesService) {
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
      this.personalBest = this.liczdobre;

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

    //aktualizowanie wyniku dla teraźniejszego gracza
    this.objIndex = this.yourScore.findIndex((obj => obj.name == this.login.value.username));
    this.yourScore[this.objIndex].score = this.personalBest;

    //sortowanie tablicy malejąco wzgledem wyniku
    this.yourScore.sort((a, b) => {
      return b.score - a.score;
    });

    //Wyslanie tablicy na localstorage
    localStorage.setItem("wynik", JSON.stringify(this.yourScore));

    //resecik formularza aby zlikwidować zaznaczenie
    this.formu.reset();
  }

  submit2() {
    this.isuserName = true;
    this.liczdobre = 0;

    this.yourScore.push({
      name: this.login.value.username,
      score: this.liczdobre,
    });
    //this.yourScore = this.localStore;
    // let wyniki = JSON.parse(<string>localStorage.getItem('wynik'));
    // this.objIndex = wyniki.findIndex(((obj: { name: string; score: number }) => obj.name == this.login.value.username));
    // let personalBest = this.yourScore[this.objIndex].score
    //
    // if(personalBest > 0) {
    //
    // }
    // else {
    //
    // }
    // localStorage.setItem("wynik", JSON.stringify(this.yourScore));
  }

}



