import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {LiczenieService} from "../liczenie.service";

@Component({
  selector: 'app-obrazki',
  templateUrl: './obrazki.component.html',
  styleUrls: ['./obrazki.component.scss']
})
export class ObrazkiComponent implements OnInit {

  licznik$: Observable<number>;

  public url: string[] = [
    './assets/pan-krzysztof.jpg',
    './assets/pan-major.jpg',
    './assets/siema.jpg'
  ]

  public krzycho = this.url[0];
  public major = this.url[1];
  public siema = this.url[2];

  constructor(private liczenieService: LiczenieService) {
    this.licznik$ = this.liczenieService.counter.asObservable();
  }

  ngOnInit(): void {

  }
}
