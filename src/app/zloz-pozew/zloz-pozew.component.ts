import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-zloz-pozew',
  templateUrl: './zloz-pozew.component.html',
  styleUrls: ['./zloz-pozew.component.scss']
})
export class ZlozPozewComponent implements OnInit {

  public pozewFormularz: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  adresatPisma: string[] = ["I Komisariat Policji W Białymstoku",
                            "II Komisariat Policji W Białymstoku",
                            "III Komisariat Policji W Białymstoku",
                            "IV Komisariat Policji W Białymstoku",
                            "Komenda Miejska Policji",
                            "Marszałek Sejmu",
                            "Prezydent Miasta Białystok",
                            "Premier",
                            "Sąd Rejonowy w Białymstoku",
                            "Sąd Apelacyjny w Białymstoku",
                            "Wojewódzki Sąd Administracyjny w Białymstoku",
                            "Samodzielny Publiczny Psychiatryczny Zakład Opieki Zdrowotnej w Choroszczy"]

  rodzajPisma: string[] = ["Pismo", "Pozew", "Skarga", "Donos", "Zażalenie", "Wniosek"]

  ngOnInit(): void {
    this.initilizePozewForm();
  }

  initilizePozewForm(): void{
    this.pozewFormularz = this.fb.group({
      autor: "",
      rodzajPisma: this.rodzajPisma[0],
      adresat: this.adresatPisma[0],
      sprawaTemat: "",
      opis: ""
    });
  }

  wyslijPozew(){
    console.log(this.pozewFormularz.get('autor')?.value);
  }

}
