import { Component, OnInit } from '@angular/core';
import { Rekord } from "../models/rekordy";

@Component({
  selector: 'app-tablica-rekordow',
  templateUrl: './tablica-rekordow.component.html',
  styleUrls: ['./tablica-rekordow.component.scss']
})
export class TablicaRekordowComponent implements OnInit {

  public myData = JSON.parse(<string>localStorage.getItem('wynik'));

  constructor() { }

  ngOnInit(): void {
  }

}


