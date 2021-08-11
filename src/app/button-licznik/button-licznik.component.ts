import { Component, OnInit } from '@angular/core';
import {LiczenieService} from "../liczenie.service";

@Component({
  selector: 'app-button-licznik',
  templateUrl: './button-licznik.component.html',
  styleUrls: ['./button-licznik.component.scss']
})
export class ButtonLicznikComponent implements OnInit {

  constructor(private liczenieService: LiczenieService) {
  }

  ngOnInit(): void {
  }

  buttonClicked(){
    this.liczenieService.incrementNumber();
  }

}
