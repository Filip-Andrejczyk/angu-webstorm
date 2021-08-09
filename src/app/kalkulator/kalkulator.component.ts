import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit {
  myForm: FormGroup | undefined;
  rodzaje: string[] = ["Nitro", "Denaturat", "Dragon"];

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
