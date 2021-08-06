import { Component, OnInit } from '@angular/core';
import {LiczenieService} from "../liczenie.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-button-licznik',
  templateUrl: './button-licznik.component.html',
  styleUrls: ['./button-licznik.component.css']
})
export class ButtonLicznikComponent implements OnInit {

  //count$: Observable<number>;

  constructor(private liczenieService: LiczenieService) {
    //this.count$ = this.liczenieService.counter.asObservable();
  }

  ngOnInit(): void {
    //this.count$ = this.liczenieService.getNumber();
  }

  buttonClicked(){
    this.liczenieService.incrementNumber();
  }

}
