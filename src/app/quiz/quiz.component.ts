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
    //this.div = document.getElementById('piez').innerHTML.valueOf();

    if (this.formu.value.gender == this.poprawny){

      console.log("dobrzee");
      this.liczdobre++;
      // if(this.stringStyle == 'btn-default') {
      //   this.stringStyle = 'btn-change';
      // } else {
      //   this.stringStyle = 'btn-default';
      // }

      //{

      //}
      setTimeout(() => this.infozapicomponent.nextPieselek(), 5000);
    }else{
      console.log("zleeeee")
      this.liczdobre = 0;
    }
    console.log("zaznaczyłem: ", this.formu.value.gender);
    console.log("poprawny to: ", this.poprawny);
    this.formu.reset();
  }

}
