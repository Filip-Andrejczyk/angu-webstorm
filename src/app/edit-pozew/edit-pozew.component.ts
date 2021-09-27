import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudPismoService} from "../shared/crud-pismo.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-pozew',
  templateUrl: './edit-pozew.component.html',
  styleUrls: ['./edit-pozew.component.scss']
})
export class EditPozewComponent implements OnInit {

  public editForm: FormGroup = this.fb.group({});
  public zaktualizowanoPismo: boolean = false;


  constructor(
    private crudApi: CrudPismoService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  public url: string[] = ['./assets/checked.png'];
  public icon = this.url[0];

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


  ngOnInit(): void {
    this.updatePismoData();
    const id = this.actRoute.snapshot.paramMap.get('id') as string;
    this.crudApi.getPismo(id).valueChanges().subscribe(data =>{
      this.editForm.setValue(data)
    })

  }

  get imie(){return this.editForm.get('autorImie');}
  get nazwisko(){return this.editForm.get('autorNazwisko')}
  get temat(){return this.editForm.get('sprawaTemat');}
  get opis(){return this.editForm.get('opis');}

  updatePismoData(){
    this.editForm = this.fb.group({
      imie: ['',[Validators.pattern('^([a-zA-Z]+)(\\s)?([a-zA-Z]+)?$')]],
      nazwisko: [''],
      rodzajpisma: this.rodzajPisma[0],
      adresat: this.adresatPisma[0],
      temat: [''],
      opis: [''],
      expanded: [false]
    })
  }

  updateForm(){
    this.zaktualizowanoPismo = true
    this.crudApi.updatePismo(this.editForm.value);

    setTimeout(
      () => {
        this.zaktualizowanoPismo = false;
      }, 5000);

    this.router.navigate(['listujpisma'])
  }

}
