import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoZApiComponent} from "../info-z-api/info-z-api.component";
import {Observable} from "rxjs";
import {DogsRandomService} from "../dogs-random.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  goodAnswerBreed$: Observable<string> | undefined;
  allObservable$: Observable<string[]> | undefined;
  losowe$: Observable<string[]> | undefined;

  public poprawny: string = "";

  public dogForm: FormGroup = this.fb.group({});

  constructor(private infozapicomponent: InfoZApiComponent,
              private cdRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private dogsRandomService: DogsRandomService) {
    this.goodAnswerBreed$ = this.infozapicomponent.rasa$;
    this.allObservable$ = this.dogsRandomService.wszystkieRasy$;

  }

  ngOnInit(): void {
    this.goodAnswerBreed$?.subscribe(ta => this.poprawny = ta);
    //this.wylosujPieski();
    this.losowe$ = this.dogsRandomService.trzylosowe$;
  }

  formu = new FormGroup({
    gender: new FormControl('', Validators.required)
  });

  get f(){
    return this.formu.controls;
  }

  // wylosujPieski(): void{
  //   this.goodAnswerBreed$?.subscribe(ten => this.poprawny = ten)
  //   this.allObservable$?.subscribe(pzy => {
  //        this.allDogs = pzy;
  //        this.threeRandoms = this.chooseThreedogz(this.allDogs, 3);
  //        this.threeRandoms.push(this.poprawny);
  //        this.threeRandoms = this.shuffle(this.threeRandoms);
  //     });
  // }

  shuffle(array: string[]){
    var currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
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
    //this.wylosujPieski();
    //this.dogsRandomService.wylosujDogs();
    this.losowe$ = this.dogsRandomService.trzylosowe$;
    console.log("poprawny", this.poprawny);
    console.log("wybrany", this.formu.value.gender);
    this.infozapicomponent.nextPieselek();
    this.formu.reset();
  }

}
