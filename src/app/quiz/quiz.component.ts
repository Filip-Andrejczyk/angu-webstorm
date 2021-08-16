import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoZApiComponent} from "../info-z-api/info-z-api.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  goodAnswerBreed$: Observable<string> | undefined;
  allObservable$: Observable<string[]> | undefined;
  restBreeds: string[] = []
  public poprawny: string = "";
  public allDogs: string[] = [];
  public threeRandoms: string[] = [];
  public i: number = 0;
  public dlugosc: number = 0;

  public dogForm: FormGroup = this.fb.group({});

  constructor(private infozapicomponent: InfoZApiComponent, private cdRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.goodAnswerBreed$ = this.infozapicomponent.rasa$;
    this.allObservable$ = this.infozapicomponent.allBreeds$;
  }

  ngOnInit(): void {
    this.goodAnswerBreed$?.subscribe(ta => this.poprawny = ta);
    this.allObservable$?.subscribe(pzy => {
      this.allDogs = pzy
      this.threeRandoms = this.chooseThreedogz(this.allDogs, 3);
    });
    this.dlugosc = this.allDogs.length;
    this.i = this.getRandomInt(this.allDogs.length);
  }

  public getRandomInt(max: number){
    return Math.floor(Math.random() * max);
  }


  formu = new FormGroup({
    gender: new FormControl('', Validators.required)
  });

  get f(){
    return this.formu.controls;
  }

  chooseThreedogz(array: string[], n: number): string[]{
    var threeRandomDogs = new Array(n)
    let len = array.length;
    let taken = new Array(len);
    while (n--) {
      var x = Math.floor(Math.random() * len);
      threeRandomDogs[n] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return threeRandomDogs;
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

    console.log("poprawny", this.poprawny);
    console.log("wybrany", this.formu.value.gender);
    this.infozapicomponent.nextPieselek();
    console.log("to jest dlugosc psuf: ", this.dlugosc)
    this.formu.reset();
    this.ngOnInit();
  }

}
