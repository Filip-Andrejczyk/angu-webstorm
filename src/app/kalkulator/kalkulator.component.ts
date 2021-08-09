import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({});
  rodzaje: string[] = ["Nitro", "Denaturat", "Dragon"];
  //ilosc = this.formBu
  //myForm = new FormBuilder();

  constructor(private fb: FormBuilder) { }
  // KalkulatorComponent = new FormGroup('');

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    this.myForm = this.fb.group({
      iloscLitrow: '',
      rodzajRozpuszczalnika: ''
    });
    this.myForm.valueChanges.subscribe(console.log);
  }

}
