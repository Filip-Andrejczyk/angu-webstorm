import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  public collaps: boolean = false;
  public clicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }



  switchCollaps(){
    // setTimeout(
    //   () => {
    //     // this.clicked = !this.clicked;
    //     this.collaps = !this.collaps;
    //   }, 150);
    this.collaps = !this.collaps;
  }

  toggleRoll(){
    let element:HTMLElement = document.getElementById('trigger') as HTMLElement;
    element.click();
  }

}
