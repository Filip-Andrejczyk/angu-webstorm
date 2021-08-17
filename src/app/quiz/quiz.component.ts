import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

  public dogForm: FormGroup = this.fb.group({});

  constructor(private infozapicomponent: InfoZApiComponent,
              private cdRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private dogsRandomService: DogsRandomService,
              private jedenWybranyPiesService: JedenWybranyPiesService)
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

  get f(){
    return this.formu.controls;
  }

  submit(){
    //console.log(this.formu.value.gender);
    //var poprawny: string = '';
    //this.goodAnswerBreed$?.subscribe(ta => this.poprawny = ta); //przypisuje se zmienna observable do normalnej zeby jej tu uzyc w funkcji

    // if (this.formu.value.gender == this.poprawny){
    //   console.log("dobrzee")
    //   this.infozapicomponent.nextPieselek();
    // }else{
    //   console.log("zleeeee")
    // }
    //console.log("to je wybrany: ", this.formu.value.gender)
    // console.log("A to jest poprawna rasa: ", this.goodAnswerBreed$?.subscribe(res => res))
    //this.goodAnswerBreed$?.subscribe(res => console.log("A to jest poprawna rasa: ", res))
    //this.wylosujPieski();
    //this.dogsRandomService.wylosujDogs();
    console.log("poprawny", this.poprawny);
    console.log("wybrany", this.formu.value.gender);
    this.infozapicomponent.nextPieselek();
    this.formu.reset();
  }

}
