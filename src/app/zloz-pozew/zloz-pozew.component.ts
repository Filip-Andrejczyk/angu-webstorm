import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudPismoService} from "../shared/crud-pismo.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-zloz-pozew',
  templateUrl: './zloz-pozew.component.html',
  styleUrls: ['./zloz-pozew.component.scss'],
})
export class ZlozPozewComponent implements OnInit {

  public pozewFormularz: FormGroup = this.fb.group({});
  public zlozonoPismo: boolean = false;

  constructor(private fb: FormBuilder, public crudApi: CrudPismoService,private actRoute: ActivatedRoute,
              private router: Router) {}

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
                            "Samodzielny Publiczny Psychiatryczny Zakład Opieki Zdrowotnej w Choroszczy",
                            "Minister Budownictwa",
                            "Urząd Marszałkowski Województwa Podlaskiego"];

  rodzajPisma: string[] = ["Pismo", "Pozew", "Skarga", "Donos", "Zażalenie", "Wniosek"];

  public url: string[] = ['./assets/checked.png'];
  public icon = this.url[0];

  ngOnInit(): void {
    this.initilizePozewForm();
    this.crudApi.getPismaList()
  }


  initilizePozewForm(): void{
    this.pozewFormularz = this.fb.group({
      imie: ['', [Validators.required, Validators.pattern('^([a-zA-Z]+)(\\s)?([a-zA-Z]+)?$')]],
      nazwisko: ['', [Validators.required]],
      rodzajpisma: this.rodzajPisma[0],
      adresat: this.adresatPisma[0],
      temat: ["", Validators.required],
      opis: ["", Validators.required],
      expanded: [false]
    });
  }

  get imie(){return this.pozewFormularz.get('autorImie');}
  get nazwisko(){return this.pozewFormularz.get('autorNazwisko')}
  get temat(){return this.pozewFormularz.get('sprawaTemat');}
  get opis(){return this.pozewFormularz.get('opis');}

  wyslijPozew(){

    console.log(this.pozewFormularz.value);
    this.zlozonoPismo = true;
    this.crudApi.addPismo(this.pozewFormularz.value);
    this.pozewFormularz.reset({rodzajpisma: this.rodzajPisma[0], adresat: this.adresatPisma[0]});

    setTimeout(
      () => {
        this.zlozonoPismo = false;
        this.router.navigate(['paneluzytkownika'])
      }, 5000);
  }
}
