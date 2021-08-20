import {ChangeDetectorRef, Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoZApiComponent} from "../info-z-api/info-z-api.component";
import {Observable} from "rxjs";
import {DogsRandomService} from "../dogs-random.service";
import {JedenWybranyPiesService} from "../jeden-wybrany-pies.service";

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
  public dogForm: FormGroup = this.fb.group({});
  public stringStyle: string = "btn-default";
  public div: string = "";
  public dogSelected: boolean = false;
  public isuserName: boolean = false;
  public przegrana: boolean = false;
  public objIndex: number = 0;


  public yourScore: { name: string, score: number }[] = [];

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

  //public nazwaGracza: string = this.login.get('username')?.value;
  //update score:


  get f() {
    return this.formu.controls;
  }

  newUser(){
    this.przegrana = false;
    this.isuserName = false;
  }
  tryAgain(){
    this.przegrana = false;
    this.infozapicomponent.nextPieselek();
  }

  submit() {
    this.dogSelected = true;

    if (this.formu.value.gender == this.poprawny) {

      console.log("dobrzee");
      this.liczdobre++;

      setTimeout(() => {
        this.dogSelected = false;
        this.infozapicomponent.nextPieselek();
      }, 2000);

    } else {
      setTimeout(
        () => {
          this.dogSelected = false;
          this.przegrana = true;
          //this.infozapicomponent.nextPieselek();
        }, 1000);
      this.liczdobre = 0;

    }
    //console.log("zaznaczyłem: ", this.formu.value.gender);
    //console.log("poprawny to: ", this.poprawny);

    this.objIndex = this.yourScore.findIndex((obj => obj.name == this.login.value.username));
    this.yourScore[this.objIndex].score = this.liczdobre;

    localStorage.setItem("wynik", JSON.stringify(this.yourScore));
    this.formu.reset();
  }

  submit2() {
    this.isuserName = true;

    this.yourScore.push({
      name: this.login.value.username,
      score: this.liczdobre,
    });
    //console.log(this.login.get('username')?.value);
  }

}



