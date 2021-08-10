import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({});
  public denaturatHistory: {
    nrpor: number,
    ilosc: number,
    rodzaj: string,
    wynik: string
  }[]= [];
  rodzaje: string[] = ["Nitro", "Denaturat", "Dragon"];
  public showPic: boolean = false;
  public pokaFaka: boolean = false;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    this.myForm = this.fb.group({
      iloscLitrow: '',
      rodzajRozpuszczalnika: this.rodzaje[0]
    });
    this.myForm.valueChanges.subscribe(console.log);
  }

  public nr = 1;

  submit(){
    const qu = this.myForm.get('iloscLitrow')?.value;
    const ki = this.myForm.get('rodzajRozpuszczalnika')?.value;
    let wy = '';

    if (ki === 'Nitro'){
      wy = (qu >= 3) ? 'ideolo' : 'mao';
    }
    if (ki === 'Denaturat'){
      wy = (qu >= 5) ? 'ideolo' : 'mao';
    }
    if (ki === 'Dragon'){
      wy = (qu >= 4) ? 'ideolo' : 'mao';
    }

    this.denaturatHistory.push({
        nrpor: this.nr,
        rodzaj: ki,
        ilosc: qu,
        wynik: wy
      })
    if (wy === 'ideolo'){
      this.showPic = true;
    }else{
      this.showPic = false;
    }
    this.nr++;
  }
}
