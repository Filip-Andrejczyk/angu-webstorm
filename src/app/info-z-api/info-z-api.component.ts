import { Component, OnInit } from '@angular/core';
import {GetApiService} from '../get-api.service';

@Component({
  selector: 'app-info-z-api',
  templateUrl: './info-z-api.component.html',
  styleUrls: ['./info-z-api.component.scss']
})
export class InfoZApiComponent implements OnInit {

  scierzka = "";
  //public picPath: String = "";


  constructor(private api: GetApiService) { }

  ngOnInit(): void {
    //this.getPicPieska();
  }

  nextPieselek(): void{
    this.getPicPieska();
  }

  getPicPieska(): void{
    this.api.apiCall()
      .subscribe( data => {
        this.scierzka = data.message;
    });
  }
}

//ja chce wziac wartosc z jsona z message jako nowa sciezka

