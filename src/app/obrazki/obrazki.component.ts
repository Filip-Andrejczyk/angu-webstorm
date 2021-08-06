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

  constructor(private liczenieService: LiczenieService) {
    this.licznik$ = this.liczenieService.counter.asObservable();
  }

  ngOnInit(): void {
  }

}
